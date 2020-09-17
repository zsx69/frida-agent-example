# -*- encoding:utf-8 -*-
# Author: zsx <18611901469@163.com>
# Date:   2020/8/2
# 上海市静安区新闸路890号底层、892号底层
import base64
import uuid
import time
from pprint import pprint

import requests

from build_header import build_header

headers = """
Page-Schema	matrix%2Fdeal_homepage
Lianjia-City-Id	110000
User-Agent	Beike2.33.0;google Pixel+XL; Android 8.1.0; ABtestEnable false
Lianjia-Channel	Android_ke_smppc_jingpinwai
Lianjia-Device-Id	c47bce00c0c3165a
Lianjia-Version	2.33.0
Host	app.api.ke.com
"""


def get_secret(res: str):
    import hashlib
    """
    使用sha1加密算法，返回str加密后的字符串
    """
    sha = hashlib.sha1(res.encode('utf-8'))
    encrypts = sha.hexdigest()
    print(encrypts)
    return encrypts


def get_uuid():
    return uuid.uuid1().__str__()


time_stamp = int(time.time())
url = f"https://app.api.ke.com/Rentplat/v1/rented/list?city_id=110000&condition=shahe2%2F&offset=0&limit=30&request_ts={time_stamp}"
header_parm = build_header(headers)
encrypt = f"d5e343d453aecca8b14b2dc687c381cacityId=110000condition=shahe2%2Flimit=30offset=0request_ts={time_stamp}"

httpAppId = "20180111_android:"
c = get_secret(encrypt)
print(encrypt)

parm = httpAppId + c

bytes_url = parm.encode("utf-8")
str_url = base64.b64encode(bytes_url)  # 被编码的参数必须是二进制数据
header_parm["x-req-id"] = uuid.uuid1().__str__()
header_parm["Authorization"] = str_url.decode()
header_parm[
    'extension'] = 'lj_duid=DuPWK84bMsl6rN0fAuEkr4uLN9zl0SCUyEhh5Uod8HDda+FANN0Eok/7Fy9Z9OA/R98uv7w9zQMNC7AcMPtZxKbA&lj_android_id=585c3437650f9ffa&lj_imei=352530082383944&lj_device_id_android=585c3437650f9ffa&mac_id=AC:37:43:A9:0B:B9'
header_parm[
    'Cookie'] = f'lianjia_udid=585c3437650f9ffa;lianjia_ssid={get_uuid()};lianjia_uuid={get_uuid()}'
res = requests.get(url, headers=header_parm)
# print(header_parm)
s = res.json()["data"]["list"]
# print(res.text)
# print(len(s))
print(s)
