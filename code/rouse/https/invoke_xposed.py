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
    url = "http://192.168.0.112:8889"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    res = requests.post(url=url, data=data, headers=headers).text
    print(res)
    # r = json.loads(requests.post(url=url, data=data, headers=headers).text)
    # print(json.dumps(r, ensure_ascii=False, indent=5))
    # print(r['music.search.SearchBrokerCgiServer.DoSearchForQQMusicMobile']['data']["body"]["item_user"][0]['encrypt_uin'])


if __name__ == '__main__':
    # result = get_response()
    s = "AAAAAAB4AbVWbWvcRhD+K0WF+xDMSfJdcvbBYdwGl+DGTqlJS4MRe9LqtDmtVpFWJ8vGUEqhpbRN6EtC+kJMSz41gZa+kDSU/pm7c/MvOrsr6U53Z+O46X25Xe3szDwzz8zsgWYzB2ttY0mLk265pnFPa2vakuYgjrT2gWZHGHEWiWVA7L469DByQmLDxuM8bOs690jk3LpVv+WzHqvbgd5b63Zip1/rd97KDOPt7U3GKd3b2Wrub13hr11La3HHNIwa7xhgi7hKGSwTEmjtpmGsNleaK43WkuayqEscB8NncJXEVpcEjpVi0mXyi1xZCXGUZ2o78RTv8QhwCEQxCXo4IoELFw+KHVwzDqVZ0NkFwYltuIIDO8pCDurBvNbCwf7W5mCjhW3S2r9wQXgeu8z3WZo75zMRIfCzm2RWuXHRYLJxSBxPdrGHIpxEPmjPI5nVIYw2ozrV5aEeRswlPtYBNt6re5z6a0kMOJxOxVUpbHWzPs4EPNBpyaWmDnItltQi4gznIYoQjcH0vD4Iyc2EhkoDQVZFCVznWYiLSIq1BC1unITF9gkOeAkmjLCLI4Vm/fLO+hsdaaFmpYOOWZvz59UU2x7iVoQdEmGbgwe2K+wvAlxAVTZmsU5bm7OjzeLmKOYYggaWBDpQRmwWKJBC2B+oKNzYXdIodhAk8kBzfQRFJNhaypbJ7XFCe6JAaBITWxcSundRl3etXj0MemDjtEBKySky5OKTTEmWWxRz5JfZVuoXkEOkdtGFCj20Q4GUQCSCIudnR6bu6f7AOAM4ZNs+HmB/Ct8a1F6V6RVi0swqLkEklLFFpCiEypBUEM7YEHi7yO7LrnSgwd8MrWeyGHqMMyvAqb5jmOZVQ/zMjSvbA968nlzb7ubIVaE0oXoI96FkNMEgxWNBm/Lr6QR46ZVUiec84f+3QosJJT6CySIacJCITnSgDUhMYNzAVlaQi4K4XMtOW92JCq5+UXQuv0WOWoqU0kwWnUqDtrN+/M2Hzx/8Onx6B5iTn2ntG5NEjO5+N370AxyejwBBn/LUfJMPwoL6PsrUoDupHSwiUiMzXl+PG8Z7oU9zIsHAPhNZUp0j1sPTbbZojt7FGkyQFaNpNkxz1VzO20ill6ueAidyuFZkZSAX1VlqSZNwqVJgquueaBySoyybkgmGzD0kziwWy5Ilk9Q8/+DH0dPfhs8+Gd97eN4ELRuXN1ca5rtXydb1+s1QNN7zJQi/43HH2Lq0v+HPJ2j0+YPx9w/B3/G9P0bv3wfODf86Ov74l9GdR//8fX/457dg9rR+n5c792C6ZNN9cS6kbrWL1VzxCurk6svwVqo9wyiymGtxBspBUiZavMhOzK/yY3EXPatHZbaXD3dF5Yknkaj9omgLbo8ffzr67GvwppKWGJ6bWX2mA8ODicIkTUKfIUfnlk0bliqmMOnCVPB0s7HcahWFOBfwNE3zd5cwB6MOGsEu+DkgDpbPxVnfQGyiJN+UMzhkMbfkVYuyCFdV0gxFnMCcm+75wydfjo9uj+9+dPzT0SsiARPlolcozOXDsBgBOIpZAGOeoh7aJ0H1jXjy2CzES+em29J/Ca9ZDDoGjw87gCDCI2gqmjSLkENkPIscD588G3/x+Pir30e3f35x4FLddFFUS6CSFyn7siFfWj0V8uHhv2DdmSQ="
    encrypt(s)