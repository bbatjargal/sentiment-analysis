from facebook import get_user_from_cookie, GraphAPI


class FbUserApi(object):
    def __init__(self, access_token):
        self.graph = GraphAPI(access_token=access_token, version='3.0')

    def getFriendsInfo(self):
        # Get the user's friends.
        user_friends = self.graph.get_connections_with_params(
            id='me', connection_name='friends', params='?fields=picture{url},name')

        print(user_friends)

        friends = []
        for item in user_friends['data']:
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

            friends.append(friend)

        return friends
