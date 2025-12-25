from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

# Helper function to generate IDs
def generate_id():
    return str(uuid.uuid4())

def get_current_time():
    return datetime.utcnow()

# ============ Admin User Models ============
class AdminUserBase(BaseModel):
    email: EmailStr
    name: str

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUserLogin(BaseModel):
    email: EmailStr
    password: str

class AdminUser(AdminUserBase):
    id: str = Field(default_factory=generate_id)
    role: str = "admin"
    created_at: datetime = Field(default_factory=get_current_time)

class AdminUserInDB(AdminUser):
    hashed_password: str

# ============ Program Models ============
class ProgramBase(BaseModel):
    title: str
    category: str
    description: str
    image: str
    beneficiaries: int = 0

class ProgramCreate(ProgramBase):
    pass

class ProgramUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    beneficiaries: Optional[int] = None
    status: Optional[str] = None

class Program(ProgramBase):
    id: str = Field(default_factory=generate_id)
    status: str = "active"
    created_at: datetime = Field(default_factory=get_current_time)
    updated_at: datetime = Field(default_factory=get_current_time)

# ============ News/Blog Models ============
class NewsBase(BaseModel):
    title: str
    excerpt: str
    content: Optional[str] = ""
    category: str
    image: str

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    status: Optional[str] = None

class News(NewsBase):
    id: str = Field(default_factory=generate_id)
    date: datetime = Field(default_factory=get_current_time)
    status: str = "published"
    created_at: datetime = Field(default_factory=get_current_time)

# ============ Impact Story Models ============
class StoryBase(BaseModel):
    name: str
    location: str
    story: str
    image: str
    program: str

class StoryCreate(StoryBase):
    pass

class StoryUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    story: Optional[str] = None
    image: Optional[str] = None
    program: Optional[str] = None

class Story(StoryBase):
    id: str = Field(default_factory=generate_id)
    created_at: datetime = Field(default_factory=get_current_time)

# ============ Gallery Models ============
class GalleryBase(BaseModel):
    url: str
    title: str
    category: str

class GalleryCreate(GalleryBase):
    pass

class GalleryImage(GalleryBase):
    id: str = Field(default_factory=generate_id)
    created_at: datetime = Field(default_factory=get_current_time)

# ============ Donation Models ============
class DonationBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    amount: float
    type: str = "one-time"  # one-time or monthly
    pan: Optional[str] = None
    address: Optional[str] = None

class DonationCreate(DonationBase):
    pass

class Donation(DonationBase):
    id: str = Field(default_factory=generate_id)
    status: str = "pending"  # pending, completed, failed
    payment_id: Optional[str] = None
    created_at: datetime = Field(default_factory=get_current_time)

# ============ Contact Inquiry Models ============
class InquiryBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class InquiryCreate(InquiryBase):
    pass

class InquiryUpdate(BaseModel):
    status: str  # new, replied, closed

class Inquiry(InquiryBase):
    id: str = Field(default_factory=generate_id)
    status: str = "new"
    created_at: datetime = Field(default_factory=get_current_time)

# ============ Volunteer Application Models ============
class VolunteerBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    city: str
    interest: str
    availability: str
    experience: Optional[str] = None
    message: Optional[str] = None

class VolunteerCreate(VolunteerBase):
    pass

class VolunteerUpdate(BaseModel):
    status: str  # new, contacted, accepted, rejected

class Volunteer(VolunteerBase):
    id: str = Field(default_factory=generate_id)
    status: str = "new"
    created_at: datetime = Field(default_factory=get_current_time)

# ============ Newsletter Models ============
class NewsletterBase(BaseModel):
    email: EmailStr

class NewsletterCreate(NewsletterBase):
    pass

class Newsletter(NewsletterBase):
    id: str = Field(default_factory=generate_id)
    status: str = "active"
    subscribed_at: datetime = Field(default_factory=get_current_time)

# ============ Token Models ============
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
