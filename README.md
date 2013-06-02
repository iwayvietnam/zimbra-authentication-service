zimbra-authentication-service
=============================

# Zimbra Authentication Service (ZAS)

## Introduction
  
Mục tiêu của project là cung cấp dịch vụ xác thực giữa Zimbra và ứng dụng của 1 bên thứ ba - single sign on giữa 2 bên. Hiện tại, tập trung vào việc xác thực giữa AMIS của công ty MISA và Zimbra; sau đó, có thể mở rộng ra với các dịch vụ khác.

## Use case:
  1. Khởi tạo:
     
     Khi người quản trị của công ty sử dụng dịch vụ AMIS khai báo các thông tin, nếu chọn sử dụng dịch vụ email, hệ thống sẽ tự tạo các email tương ứng với người dùng của công ty đó.

  2. Người dùng sử dụng dịch vụ lần đầu:
     
     Người dùng khai báo các thông tin trên AMIS, sẽ điền thêm username/email và password để "xác thực" và đăng nhập vào dịch vụ mail luôn.
     **Việc bắt người dùng đăng nhập vào dịch vụ mail chỉ diễn ra một lần.**

  3. Người dùng sử dụng dịch vụ từ lần thứ 2:
     
     Người dùng đã đăng nhập vào AMIS, khi chuyển qua phần email sẽ không bị hỏi thông tin đăng nhập.
     AMIS, thông qua ZAS,  sẽ gửi một số thông tin cho Zimbra để xác thực người dùng.

## Các giải pháp lựa chọn:
  1. OpenID
  2. Persona
  3. Custom 1 cái riêng có cơ chế sử dụng token key giống Google,...
