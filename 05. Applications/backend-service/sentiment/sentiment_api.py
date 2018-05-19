"""
@author: Group 2
"""

import web
import json
import sentiment_model as model
from fb_util import FbUserApi
from joblib import Parallel, delayed

urls = (
    '/profile', 'Profile',
    '/sentiment', 'SentimentApi',
    '/getfriendinfo', 'FriendInfo'
)
app = web.application(urls, globals())


class Profile:
    def GET(self):
        web.header('Content-Type', 'application/json')
        user_data = web.input()
        fbUser = FbUserApi(user_data.accesstoken)
        profile = fbUser.get_profile()
        posts = fbUser.get_own_posts()
        positive = sum(model.predictPositive(inputText=post)
                       for post in posts)
        profile['picture'] = profile['picture']['data']['url']
        profile['posts'] = {
            'positive': positive,
            'negative': len(posts) - positive
        }

        return json.dumps(profile)


class SentimentApi:
    def GET(self):
        web.header('Content-Type', 'application/json')
        user_data = web.input()
        inputText = user_data.inputtext
        sentiment = model.predictPositive(inputText=inputText)
        result = {'Sentiment': 'Positive' if sentiment else 'Negative'}

        return json.dumps(result)


class FriendInfo:
    def GET(self, **args):
        web.header('Content-Type', 'application/json')
        user_data = web.input()
        fbUser = FbUserApi(user_data.accesstoken)
        friends = fbUser.getFriendsInfo()
        result = Sentiment().predictAll(friends)

        return json.dumps(result)


class Sentiment:
    def predictAll(self, friends):
        for friend in friends:
            positive = 0
            lenPosts = len(friend["posts"])

            if lenPosts > 0:
                results = Parallel(n_jobs=lenPosts, backend='threading')(
                    delayed(self.processPredict)(item) for item in friend["posts"])
                positive = sum(1 for x in results if x == True)

            friend["posts"] = {
                "positive": positive,
                "negative": lenPosts - positive
            }
        return friends

    def processPredict(self, item):
        return model.predictPositive(inputText=item)


if __name__ == "__main__":
    app.run()
