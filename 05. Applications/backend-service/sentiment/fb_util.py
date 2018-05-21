from facebook import get_user_from_cookie, GraphAPI
from joblib import Parallel, delayed
from langdetect import detect


class FbUserApi(object):
    def __init__(self, access_token):
        self.graph = GraphAPI(access_token=access_token, version='3.0')

    def get_profile(self):
        profile = self.graph.get_connections_with_params(
            id='me', connection_name='', params='?fields=name,picture.type(large){url}')
        return profile

    def get_own_posts(self):
        posts = self.graph.get_connections_with_params(
            id='me', connection_name='posts', params='?fields=message&limit=100')
        posts = posts['data']
        posts = list(filter(self.checkPostObj, posts))
        posts = list(map(lambda obj: obj['message'], posts))

        return posts

    def getFriendsInfo(self):
        # Get the user's friends.
        user_friends = self.graph.get_connections_with_params(
            id='me', connection_name='friends', params='?fields=picture{url},name')

        # multiprocessing.cpu_count()
        friends = Parallel(n_jobs=10, backend='threading')(
            delayed(self.processFriendInfo)(item) for item in user_friends['data'])
        return friends

    def processFriendInfo(self, item):
        uid = item['id']

        profile = {}
        profile['id'] = uid
        profile['fullName'] = item['name']
        profile['picture'] = item['picture']['data']['url']

        posts = self.graph.get_connections_with_params(
            id=uid, connection_name='posts', params='?limit=50')
        posts = list(filter(self.checkPostObj, posts['data']))
        posts = list(map(lambda obj: obj['message'], posts))

        friend = {
            'profile': profile,
            'posts': posts
        }

        return friend

    def checkPostObj(self, x):
        try:
            return 'message' in x and \
                detect(x['message']) == 'en' and \
                len(x['message']) <= 250
        except:
            return False
