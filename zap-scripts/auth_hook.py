def authenticate(helper):
    request = helper.getHttpMessage().getRequestHeader()
    request.setHeader("X-User-ID", "1")
