from facebook import get_user_from_cookie, GraphAPI
from joblib import Parallel, delayed
from langdetect import detect


class FbUserApi(object):
    def __init__(self, access_token):
        self.graph = GraphAPI(access_token=access_token, version='3.0')

    def get_own_posts(self):
        posts = self.graph.get_connections_with_params(
            id='me', connection_name='posts', params='?fields=message&limit=100')
        posts = posts['data']

        def check(x):
            try:
                return 'message' in x and \
                    detect(x['message']) == 'en' and \
                    len(x['message']) <= 250
            except:
                return False
        posts = list(filter(check, posts))
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

        posts_list = []
        page_posts = self.graph.get_connections_with_params(
            id=uid, connection_name='posts', params='?limit=50')
        for post in page_posts['data']:
            if 'message' in post:
                posts_list.append(post['message'])

        friend = {}
        friend['profile'] = profile
        friend['posts'] = posts_list

        return friend
