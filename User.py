from flask_login import UserMixin
from time import time
import datetime
import jwt

class User(UserMixin):

    def __init__(self, username, password, email):
        self.id = int(time())
        self.username = username
        self.password = password
        self.email = email
    
    def encode_auth_token(self, user_id):
        """
        Generate the auth token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=500),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                'some key',
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        payload = jwt.decode(auth_token, 'some key')
        return payload['sub']

class UserActions():

    admin_user = User('admin', 'a', 'admin@rsa.com')
    userlist = []
    userlist.append(admin_user)

    @classmethod
    def add(cls, user):
        cls.userlist.append(user)
        print(cls.userlist)

    @classmethod
    def get(cls, id):
        for user in cls.userlist:
            if user.id == id:
                return user
        return None

    @classmethod
    def getUser(cls, username, password):
        print(cls.userlist)
        for user in cls.userlist:
            if user.username == username and user.password == password:
                return user
        return None