from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.models.user import User


class AuthService:
    """Business logic for authentication."""

    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def register(self, user_data: UserCreate) -> User:

        existing_user = self.user_repository.get_by_email(
            user_data.email
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        hashed = hash_password(user_data.password)

        return self.user_repository.create(
            full_name=user_data.full_name,
            email=user_data.email,
            hashed_password=hashed,
        )