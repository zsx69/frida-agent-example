# -*- encoding:utf-8 -*-
# Author: zsx <18611901469@163.com>
# Date:   2020/8/1

"""
x-req-id  UUID.randomUUID().toString()
Authorization
20180111_android:460907e43706eb8f7a4195c538dfa7cba7217f25
httpAppId: 20180111_android c.bsa:  SHA1ToString: 460907e43706eb8f7a4195c538dfa7cba7217f25

sha1:d5e343d453aecca8b14b2dc687c381cacityId=110000condition=fullFilters=1latitude=39.936895longitude=116.60848page=1request_ts=1596334463sugTitle=
"""
import base64
import hashlib


def get_secret(res: str):
    import hashlib
    """
    使用sha1加密算法，返回str加密后的字符串
    """
    sha = hashlib.sha1(res.encode('utf-8'))
    encrypts = sha.hexdigest()
    print(encrypts)
    return encrypts


# get_secret('d5e343d453aecca8b14b2dc687c381cacityId=110000condition=fullFilters=1latitude=39.936895longitude=116.60848page=1request_ts=1596334463sugTitle=')
encrypt = "d5e343d453aecca8b14b2dc687c381cacityId=110000condition=fullFilters=1latitude=39.936895longitude=116.60848page=1request_ts=1596335056sugTitle="

httpAppId = "20180111_android"
b = ":"
c = get_secret(encrypt)

parm = httpAppId + b + c

bytes_url = parm.encode("utf-8")
str_url = base64.b64encode(bytes_url)  # 被编码的参数必须是二进制数据
print(str_url)
