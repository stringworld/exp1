<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8" %>
<%
    String code = request.getParameter("code");
    String productId = request.getParameter("productId");
    String shareId = request.getParameter("shareId");
%>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd" >
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0,user-scalable=no"/>
    <meta content="telephone=no" name="format-detection"/>
    <link rel="shortcut icon" href="../../img/favicon.ico" mce_href="../../img/favicon.ico" type="image/x-icon">
    <title>健医科技</title>
    <script src="../js/core/main-init.js"></script>
    <script type="text/javascript">
        window.location.href = MyConstants.FILE_URL + "/view/doctor/doctor.html#/doctor.login?productId=<%=productId%>&code=<%=code%>&shareId=<%=shareId%>";
    </script>
</head>
<body>

</body>
</html>