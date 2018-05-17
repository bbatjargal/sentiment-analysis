"""
@author: Group 2
"""

import web
#import sys,os
import json
import sentiment_model as model
from fb_util import FbUserApi

urls = (
    '/sentiment', 'SentimentApi',
    '/getfriendinfo', 'FriendInfo'
)
app = web.application(urls, globals())


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
            for post in friend["posts"]:
                isPositive = model.predictPositive(inputText=post)
                if isPositive:
                    positive += 1

            friend["posts"] = {
                "positive": positive,
                "negative": lenPosts - positive
            }
        return friends


if __name__ == "__main__":
    app.run()
