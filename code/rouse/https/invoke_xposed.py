import base64

import requests
import json


def get_response():
    url = "https://u6.y.qq.com/cgi-bin/musicu.fcg"
    headers = {'User-Agent': 'QQMusic 10110511(android 9)',
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': '*/*'}
    data = {"comm":{"QIMEI36":"66a8e8c3492920ad68a940af10001d915609","qimei":"66a8e8c3492920ad68a940af10001d915609","OpenUDID":"ffffffffda3af8ff4800741e2c1df5eb","udid":"ffffffffda3af8ff4800741e2c1df5eb","ct":"11","cv":"10110511","v":"10110511","chid":"10003006","os_ver":"9","aid":"c01ad235fdb20587","mcc":"460","mnc":"09","did":"MzUyNTMxMDg2MTcxOTA1","phonetype":"Pixel","devicelevel":"30","taid":"0101869F916EBC32EBD30DAF7C1996D9321545F8A4ECE736686C19E48C9C5B434CAE743A8719B31D5F29DFCF","tmeAppID":"qqmusic","teenMode":"0","nettype":"1030","wid":"660157961767740416","rom":"google/google/sailfish/sailfish:9/PQ1A.181205.002.A1/5129870:user/release-keys/","uid":"4419929251","sid":"202106101117154419929251","OpenUDID2":"ffffffffda3af8ff4800757facdff7eb","tmeLoginType":"0","hotfix":"100000000","tid":"660157961767740416","v4ip":"106.39.47.66","traceid":"11_04419929251_1623295093","gzip":"1"},"music.search.SearchBrokerCgiServer.DoSearchForQQMusicMobile":{"module":"music.search.SearchBrokerCgiServer","method":"DoSearchForQQMusicMobile","param":{"query":"1127126624","highlight":1,"searchid":"297747470739836662","sub_searchid":0,"search_type":8,"nqc_flag":0,"sin":0,"ein":30,"page_num":1,"num_per_page":15,"cat":2,"grp":1,"remoteplace":"search.android.keyboard","multi_zhida":1,"sem":0}}}
    res = requests.post(url, data=json.dumps(data), headers=headers)
    base64_str = base64.b64encode(res.content).decode()
    return base64_str


def encrypt(data):
    url = "http://192.168.2.152:9999"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    # print(requests.post(url=url, data=data, headers=headers).text)
    r = json.loads(requests.post(url=url, data=data, headers=headers).text)
    # print(json.dumps(r, ensure_ascii=False, indent=5))
    print(r['music.search.SearchBrokerCgiServer.DoSearchForQQMusicMobile']['data']["body"]["item_user"][0]['encrypt_uin'])


if __name__ == '__main__':
    # result = get_response()
    s = "eAFsU+1u6zYMfRVBP4oNcBPb+WqMpgO2YQPWdkDQFhu2XBiyzTpqbcuh6CS9Qd79grLzdW9/2TySyEOew51MTQYy8j1JVkbBOBwM/PFwOh0FoSctKaT48mAwHXqybKxOexYUpsvek/v8iuYd8LdcPwGuAXu/mxb/w+B8/sj3H02iC5DRWc1MkZLRTsjEZB8yEjshM42QUpyjaeoWgS2hinX1ato4NRVBRTISUnpCtixi2B4RekOoDbax2HtCFooAVREX2jL6vxBfPCERcm0qzvN1qTPlki3NJq4VESAf+J6QpIlZt8XWgKTTy0yuQkcbwTbFWQnYEmB1Rv5VFwQoowMHa/AUu0w5ZKoi3TVPKpFRx4Mh2Ta0BJUxceasCcpYFUlTntK2WJNpnlnXrsPK9XeXrKnyT6DLSbmnje2I7wRrkHJjlhQ1tmOYmVQ7VhM91H/fX9vJ/VozQ6hS/KgpbjQP9YdjnZqqweLQT61T/l0S1dGiv+jTUmO2WvVWhclNL60W/fyXZGaz96v32cSO63+S/x5G8PD2vPn3T3wp/5pvruws8P0rmvnSE9I2CZ1reBRU/DSfR7dQ3k1Gg2k4Hg0Ht4s+lHc/M+fPuIq9803ZFKTZcHAhrbYx26cbhoUCUjLIw2EBnLYr7owj9u3SbB4NwuF+Fz6fGfmAvZyGY3WVdzI4LrZJSCXOYBeV2rV2ximBl8yp1srD7WWaTdj92rpQH7HB7DwzOLF4A2Bbnx5qGx89zIcVbCmuVQ7sBbdzO+F65QPGZSSuA0/IGrALB/xu1QDyyjsKCLwzDLfbfCpn29/QDwN/HPhBEEyC0XAYTKfhNBwF3Io9ErVuBTgNz+TSwk2bKJiENyPfH0xu+Ckvg+/YrgFlJHyx3++/AQAA//8BAAD//7ypfSs="
    encrypt(s)