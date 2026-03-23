# from passlib.context import CryptContext

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# def hash_password(password: str):
#     return pwd_context.hash(password)


# def verify_password(password, hashed):
#     return pwd_context.verify(password, hashed)




from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

def hash_password(password: str):
    return pwd_context.hash(password[:72])  # 👈 prevent crash

def verify_password(password, hashed):
    return pwd_context.verify(password[:72], hashed)