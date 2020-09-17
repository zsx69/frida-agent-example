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
Page-Schema	dianpu_list
Lianjia-City-Id	310000
User-Agent	Beike2.33.0;google Nexus+5; Android 6.0.1
Lianjia-Channel	Android_ke_smppc_jingpinwai
Lianjia-Device-Id	c47bce00c0c3165a
Lianjia-Version	2.33.0
Lianjia-Im-Version	2.34.0
Lianjia-Recommend-Allowable	1

lat	31.24916171
lng	121.487899486
Host	app.api.ke.com
"""

'{"id": "310000", "longitude": "121.487899486", "latitude": "31.24916171"}'
def get_secret(res:str):
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

# url = 'https://m.ke.com/store/19058900690235711976.html'
url = "https://app.api.ke.com/house/store/search?condition=&cityId=310000&page=49&longitude=121.487899486&latitude=31.24916171&sugTitle=&fullFilters=1"
header_parm = build_header(headers)
encrypt = "d5e343d453aecca8b14b2dc687c381cacityId=310000condition=fullFilters=1latitude=31.24916171longitude=121.487899486page=49sugTitle="

httpAppId = "20180111_android:"
c = get_secret(encrypt)
print(encrypt)

parm = httpAppId + c

bytes_url = parm.encode("utf-8")
str_url = base64.b64encode(bytes_url)  # 被编码的参数必须是二进制数据
header_parm["x-req-id"] = uuid.uuid1().__str__()
header_parm["Authorization"] = str_url.decode()
header_parm['extension'] = 'lj_imei=359125050980533&lj_duid=DucYmeYopb0fkAFCu5niGAi9M6rlx5pLYR9DexJ/zIM2okh+u99gVjJsObeodaH9pLZPj0NH3ONweXuPRBkjUuvA&lj_android_id=c47bce00c0c3165a&lj_device_id_android=c47bce00c0c3165a&mac_id=CC:FA:00:B2:EB:AB'
header_parm['Cookie'] = f'lianjia_udid=c47bce00c0c3165a;lianjia_ssid={get_uuid()};lianjia_uuid={get_uuid()}'
res = requests.get(url, headers = header_parm)
print(header_parm)
# pprint(res.json()["data"]["list"])
print(res.text)







