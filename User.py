from time import time
import datetime
import jwt
import os

class User:

    def __init__(self, username, password, role, email):
        self.id = int(time())
        self.username = username
        self.password = password
        self.role = role
        self.email = email

class UserActions():

    admin_user = User('admin', 'a', 'admin', 'admin@rsa.com')
    userlist = []
    userlist.append(admin_user)
    SECRET_KEY = 'D\xde@\xe4\x1ch/\xa8\xed\xd3\xc6\x98?D\xbb\xb8Bo\xc0\xb7\xc6\xc7\x92\x19'

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

    @classmethod
    def encode_auth_token(cls, user_id):
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
                cls.SECRET_KEY,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @classmethod
    def decode_auth_token(cls, auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        payload = jwt.decode(auth_token, cls.SECRET_KEY)
        return payload['sub']