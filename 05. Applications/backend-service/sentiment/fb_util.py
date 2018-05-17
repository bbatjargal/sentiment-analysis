from facebook import get_user_from_cookie, GraphAPI


class FbUserApi(object):
    def __init__(self, userId, accessToken):
        self.userId = userId
        self.accessToken = accessToken

        self.graph = GraphAPI(access_token=self.accessToken, version="3.0")
        profile = self.graph.get_object('me')
        if 'link' not in profile:
            profile['link'] = ""
        pass

    def getFriendsInfo(self):
        # Get the user's friends.
        page_friends = self.graph.get_connections_with_params(
            id=self.userId, connection_name='friends', params='?limit=100')

        friends = []
        for item in page_friends['data']:
            uid = item['id']

            profile = {}
            profile["id"] = uid
            profile["fullName"] = item['name']
            profile["picture"] = ""

            # get the picture of the user
            page_picture = self.graph.get_connections_with_params(
                id=uid, connection_name='picture', params='?height=100&width=100')

            if 'url' in page_picture:
                profile["picture"] = page_picture["url"]

            posts_list = []
            page_posts = self.graph.get_connections_with_params(
                id=uid, connection_name='posts', params='?limit=50')
            for post in page_posts['data']:
                if 'message' in post:
                    posts_list.append(post['message'])

            friend = {}
            friend["profile"] = profile
            friend["posts"] = posts_list

            friends.append(friend)

        return friends
