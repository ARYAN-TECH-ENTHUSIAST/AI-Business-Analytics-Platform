from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import create_access_token
from app.core.security import (
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.token import Token
from app.schemas.user import UserCreate


class AuthService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def register(
        self,
        user_data: UserCreate,
    ) -> User:

        existing_user = self.user_repository.get_by_email(
            user_data.email
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        hashed_password = hash_password(
            user_data.password
        )

        return self.user_repository.create(
            full_name=user_data.full_name,
            email=user_data.email,
            hashed_password=hashed_password,
        )

    def login(
        self,
        email: str,
        password: str,
    ) -> Token:

        user = self.user_repository.get_by_email(
            email
        )

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not verify_password(
            password,
            user.hashed_password,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        access_token = create_access_token(
            {"sub": user.email}
        )

        return Token(
            access_token=access_token,
            token_type="bearer",
        )