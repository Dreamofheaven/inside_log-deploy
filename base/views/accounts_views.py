from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import User
from base.serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.http import JsonResponse

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    message = {"여기 통과함"}
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            phone_number=data['phone_number'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': '해당 이메일의 사용자가 이미 존재합니다.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request,pk):
    user=User.objects.get(id=pk)
    serializer=UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request,pk):
    user=User.objects.get(id=pk)
    data=request.data
    user.username=data['email']
    user.save()
    serializer=UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request, pk):
    userForDeletion=User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



# 임시
@api_view(['POST'])
def find_user_id(request):
    if request.method=='POST':
        email=request.POST.get('email')
        try:
            user=User.objects.get(email=email)
            return JsonResponse({'username':user.username})
        except User.DoesNotExist:
            return JsonResponse({'error':'User not found.'})
    return 
# def find_user_id(request):
#     if request.method == 'POST':
#         form = FindUserIDForm(request.POST)
#         if form.is_valid():
#             last_name = form.cleaned_data['last_name']
#             email = form.cleaned_data['email']
#             users = User.objects.filter(email=email)
#             if users:
#                 for user in users:
#                     messages.success(
#                         request, f'찾으신 이름: {user.last_name} <br><br> 이메일: {user.email} <br><br> 사용자명: {user.username}')
#                 return redirect('accounts:find_user_id')
#             else:
#                 messages.error(request, '입력하신 이메일로 가입된 아이디를 찾을 수 없습니다.')
#                 return redirect('accounts:find_user_id')
#     else:
#         form = FindUserIDForm()
#     return render(request, 'accounts/find_user_id.html', {'form': form})

# def password_reset_request(request):
#     if request.method == 'POST':
#         form = PasswordResetRequestForm(request.POST)
#         if form.is_valid():
#             email = form.cleaned_data['email']
#             user = User.objects.filter(email=email).first()
#             if user:
#                 # 이메일 발송 로직
#                 subject = "비밀번호 재설정 요청"
#                 email_template_name = "accounts/password_reset_email.html"
#                 uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
#                 token = default_token_generator.make_token(user)
#                 default_path = reverse('accounts:password_reset_confirm', kwargs={'uidb64': uidb64, 'token': token})
#                 c = {
#                     "email": user.email,
#                     "domain": request.META['HTTP_HOST'],
#                     "site_name": 'your_site_name',
#                     "uid": uidb64,
#                     "user": user,
#                     "token": token,
#                     "protocol": 'https',
#                     "path": default_path,
#                 }
#                 email = render_to_string(email_template_name, c)
#                 send_mail(subject, email, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)
#                 messages.success(request, '비밀번호 재설정 이메일이 발송되었습니다.')
#                 return redirect('accounts:password_reset_request')
#             else:
#                 messages.error(request, '입력한 사용자명에 해당하는 계정을 찾을 수 없습니다.')
#                 return redirect('accounts:password_reset_request')
#     else:
#         form = PasswordResetRequestForm()
#     return render(request, 'accounts/password_reset_request.html', {'form': form})


# def password_reset_confirm(request, uidb64, token):
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#         user = None

#     # 기본 토큰 생성기를 사용한 토큰 검사
#     if user is not None and default_token_generator.check_token(user, token):
#         form = SetPasswordForm(user, request.POST or None)
#         form.fields['new_password1'].widget.attrs['placeholder'] = '새 비밀번호'
#         form.fields['new_password2'].widget.attrs['placeholder'] = '새 비밀번호 확인'
#         if request.method == 'POST':
#             if form.is_valid():
#                 form.save()
#                 messages.success(request, '비밀번호가 변경되었습니다.')
#                 return redirect('accounts:login')
#         return render(request, 'accounts/password_reset_confirm.html', {'form': form})
#     else:
#         messages.error(request, '비밀번호 재설정 링크가 유효하지 않습니다.')
#         return redirect('accounts:password_reset_request')