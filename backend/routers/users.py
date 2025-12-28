from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import os
from pydantic import BaseModel, EmailStr

from models import AdminUser, AdminUserCreate
from auth import get_password_hash, get_current_user

router = APIRouter(prefix="/users", tags=["User Management"])

# Database connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'rids_ngo')]

class AdminUserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    created_at: str

class PasswordChange(BaseModel):
    current_password: str
    new_password: str

@router.get("", response_model=List[AdminUserResponse])
async def get_all_users(current_user: dict = Depends(get_current_user)):
    """Get all admin users (admin only)."""
    users = await db.admin_users.find().to_list(100)
    return [
        AdminUserResponse(
            id=user.get("id", ""),
            email=user["email"],
            name=user["name"],
            role=user["role"],
            created_at=str(user.get("created_at", ""))
        ) for user in users
    ]

@router.post("", response_model=AdminUserResponse)
async def create_user(user: AdminUserCreate, current_user: dict = Depends(get_current_user)):
    """Create a new admin user (admin only)."""
    # Check if user already exists
    existing_user = await db.admin_users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_dict = {
        "email": user.email,
        "name": user.name,
        "hashed_password": get_password_hash(user.password),
        "role": "admin"
    }
    admin_user = AdminUser(**user_dict)
    user_dict["id"] = admin_user.id
    user_dict["created_at"] = admin_user.created_at
    
    await db.admin_users.insert_one(user_dict)
    
    return AdminUserResponse(
        id=admin_user.id,
        email=admin_user.email,
        name=admin_user.name,
        role=admin_user.role,
        created_at=str(admin_user.created_at)
    )

@router.delete("/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """Delete an admin user (admin only). Cannot delete yourself."""
    # Get the user to be deleted
    user_to_delete = await db.admin_users.find_one({"id": user_id})
    if not user_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Prevent self-deletion
    if user_to_delete["email"] == current_user["email"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    # Check if this is the last admin
    admin_count = await db.admin_users.count_documents({})
    if admin_count <= 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete the last admin user"
        )
    
    result = await db.admin_users.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {"message": "User deleted successfully"}

@router.put("/{user_id}")
async def update_user(
    user_id: str, 
    name: str = None,
    current_user: dict = Depends(get_current_user)
):
    """Update user details (admin only)."""
    update_data = {}
    if name:
        update_data["name"] = name
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No update data provided"
        )
    
    result = await db.admin_users.update_one(
        {"id": user_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {"message": "User updated successfully"}
