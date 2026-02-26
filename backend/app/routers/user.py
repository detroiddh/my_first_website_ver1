from fastapi import FastAPI , Response , status , HTTPException , Depends , APIRouter
from .. import models, schemas, utils, oauth2
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter()

@router.get("/user" , response_model=schemas.UserOut)
def get_user(current_user: int = Depends(oauth2.get_current_user)):
    return current_user