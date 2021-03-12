import requests


def encrypt(enParam):
    url = "http://192.168.2.6:8899/decrypt"
    param = enParam
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    r = requests.post(url=url, data=param, headers=headers)
    print(r.content)
    return r.content


if __name__ == '__main__':
    encrypt("47fcda3822cd10a8e2f667fa49da783f")
