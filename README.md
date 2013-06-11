zimbra-authentication-service
=============================

# Zimbra Authentication Service (ZAuth)

## Introduction
  
Mục tiêu của project là cung cấp dịch vụ xác thực giữa Zimbra và ứng dụng của 1 bên thứ ba - single sign on giữa 2 bên. Hiện tại, tập trung vào việc xác thực giữa AMIS của công ty MISA và Zimbra; sau đó, có thể mở rộng ra với các dịch vụ khác.

## Use case:
  1. Khởi tạo:
     
     Khi người quản trị của công ty sử dụng dịch vụ AMIS khai báo các thông tin, nếu chọn sử dụng dịch vụ email, hệ thống ZaaS (Zimbra as a Service - https://github.com/iwayvietnam/zimbra-multi-tenancy) sẽ cho phép khởi tạo domain mới, đăng ký tài khoản domain-admin để người quản trị của công ty quản trị các email của người dùng trong công ty đó.

  2. Người dùng sử dụng dịch vụ lần đầu:
     
     Người dùng khai báo các thông tin trên AMIS, sẽ điền thêm username/email và password để "xác thực" và đăng nhập vào dịch vụ mail luôn.
     **Việc bắt người dùng đăng nhập vào dịch vụ mail chỉ diễn ra một lần.**

  3. Người dùng sử dụng dịch vụ từ lần thứ 2:
     
     Người dùng đã đăng nhập vào AMIS, khi chuyển qua phần email sẽ không bị hỏi thông tin đăng nhập.
     AMIS, thông qua ZAuth, sẽ gửi một số thông tin cho Zimbra để xác thực người dùng.

## Giải pháp lựa chọn:
  1. Persona

## Một số giải pháp khác (và lý do không được lựa chọn):
  1. OpenID: yêu cầu các hệ thống ngoài (như AMIS) muốn tích hợp vào phải sửa nhiều code, gây phức tạp hóa vấn đề không cần thiết
  2. Custom 1 cái riêng có cơ chế sử dụng token key giống Google, FB...: implement phức tạp
