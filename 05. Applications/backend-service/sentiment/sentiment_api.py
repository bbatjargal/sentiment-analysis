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

        #user_data.accesstoken = 'EAACEdEose0cBADNZBZCULxhvJEZAKNuAXavsVD18Yvzkeq9Qgc1uw05ZBuZBJ2idEjRYpYBGsjJnwcMRYDiwlQcjsM9JjI6n8JI48SvnSrkzFIWYUac7r1q0VZB9Mo98KIZC7d0GRwY4UQ3Q7b9ZCHVr2V0dnVPte5AztQp9VY064u92N3ZAzHM4NzB5MqkZBZB03BS3JYKpuokegZDZD'
        #user_data.userid = '780876401978380'

        fbUser = FbUserApi(user_data.userid, user_data.accesstoken)
        friends = fbUser.getFriendsInfo()
        friends = Sentiment().predictAll(friends)

        return json.dumps(friends)


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
