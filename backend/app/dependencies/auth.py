from fastapi import Depends, HTTPException, status
from jose import JWTError
from sqlalchemy.orm import Session

from app.core.auth import (
    decode_access_token,
    oauth2_scheme,
)
from app.database.connection import get_db
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.token import TokenPayload

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={
        "WWW-Authenticate": "Bearer",
    },
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:

    try:
        payload = decode_access_token(token)

        token_data = TokenPayload(
            sub=payload.get("sub"),
        )

    except JWTError:
        raise credentials_exception

    if token_data.sub is None:
        raise credentials_exception

    repository = UserRepository(db)

    user = repository.get_by_email(
        token_data.sub,
    )

    if user is None:
        raise credentials_exception

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user",
        )

    return user