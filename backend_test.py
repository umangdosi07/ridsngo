#!/usr/bin/env python3
"""
Backend API Testing for RIDS NGO Website
Tests all backend APIs as specified in the review request
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://impact-rajasthan.preview.emergentagent.com/api"

class RIDSBackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.auth_token = None
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_auth_login(self):
        """Test 1: Auth API - Login with admin@rids.org / admin123"""
        try:
            url = f"{self.base_url}/auth/login"
            payload = {
                "email": "admin@rids.org",
                "password": "admin123"
            }
            
            response = requests.post(url, json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "token_type" in data:
                    self.auth_token = data["access_token"]
                    self.log_test("Auth Login", True, f"Login successful, token received")
                    return True
                else:
                    self.log_test("Auth Login", False, "Login response missing token fields", data)
                    return False
            else:
                self.log_test("Auth Login", False, f"Login failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Auth Login", False, f"Login request failed: {str(e)}")
            return False
    
    def test_contact_inquiry(self):
        """Test 2: Contact Inquiries API - Submit contact form"""
        try:
            url = f"{self.base_url}/inquiries"
            payload = {
                "name": "Priya Sharma",
                "email": "priya.sharma@example.com",
                "phone": "+91-9876543210",
                "subject": "Inquiry about Education Programs",
                "message": "I would like to know more about your education programs for rural children. How can I contribute or volunteer?"
            }
            
            response = requests.post(url, json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data.get("name") == payload["name"]:
                    self.log_test("Contact Inquiry", True, f"Contact inquiry created successfully with ID: {data['id']}")
                    return True
                else:
                    self.log_test("Contact Inquiry", False, "Contact inquiry response missing expected fields", data)
                    return False
            else:
                self.log_test("Contact Inquiry", False, f"Contact inquiry failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Contact Inquiry", False, f"Contact inquiry request failed: {str(e)}")
            return False
    
    def test_volunteer_application(self):
        """Test 3: Volunteer Applications API - Submit volunteer application"""
        try:
            url = f"{self.base_url}/volunteers"
            payload = {
                "name": "Rajesh Kumar",
                "email": "rajesh.kumar@example.com",
                "phone": "+91-9123456789",
                "city": "Jaipur",
                "interest": "Education and Child Development",
                "availability": "Weekends",
                "experience": "2 years of teaching experience in rural schools",
                "message": "I am passionate about education and would love to contribute to your programs."
            }
            
            response = requests.post(url, json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data.get("name") == payload["name"]:
                    self.log_test("Volunteer Application", True, f"Volunteer application created successfully with ID: {data['id']}")
                    return True
                else:
                    self.log_test("Volunteer Application", False, "Volunteer application response missing expected fields", data)
                    return False
            else:
                self.log_test("Volunteer Application", False, f"Volunteer application failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Volunteer Application", False, f"Volunteer application request failed: {str(e)}")
            return False
    
    def test_donation_create_order(self):
        """Test 4: Donations API - Create donation order"""
        try:
            url = f"{self.base_url}/donations/create-order"
            payload = {
                "name": "Anita Gupta",
                "email": "anita.gupta@example.com",
                "phone": "+91-9988776655",
                "amount": 5000.0,
                "type": "one-time",
                "pan": "ABCDE1234F",
                "address": "123 Main Street, Jaipur, Rajasthan"
            }
            
            response = requests.post(url, json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if "order_id" in data and "donation_id" in data and data.get("amount") == payload["amount"]:
                    self.log_test("Donation Create Order", True, f"Donation order created successfully with order_id: {data['order_id']}")
                    return True
                else:
                    self.log_test("Donation Create Order", False, "Donation order response missing expected fields", data)
                    return False
            else:
                self.log_test("Donation Create Order", False, f"Donation order failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Donation Create Order", False, f"Donation order request failed: {str(e)}")
            return False
    
    def test_newsletter_subscription(self):
        """Test 5: Newsletter API - Subscribe email"""
        try:
            url = f"{self.base_url}/newsletter"
            payload = {
                "email": "newsletter.subscriber@example.com"
            }
            
            response = requests.post(url, json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data.get("email") == payload["email"]:
                    self.log_test("Newsletter Subscription", True, f"Newsletter subscription created successfully with ID: {data['id']}")
                    return True
                else:
                    self.log_test("Newsletter Subscription", False, "Newsletter subscription response missing expected fields", data)
                    return False
            else:
                self.log_test("Newsletter Subscription", False, f"Newsletter subscription failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Newsletter Subscription", False, f"Newsletter subscription request failed: {str(e)}")
            return False
    
    def test_dashboard_stats(self):
        """Test 6: Dashboard Stats API - Get stats with auth token"""
        if not self.auth_token:
            self.log_test("Dashboard Stats", False, "No auth token available - login test must pass first")
            return False
            
        try:
            url = f"{self.base_url}/dashboard/stats"
            headers = {
                "Authorization": f"Bearer {self.auth_token}",
                "Content-Type": "application/json"
            }
            
            response = requests.get(url, headers=headers, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                expected_keys = ["donations", "volunteers", "inquiries", "programs", "stories", "news", "gallery", "newsletter"]
                if all(key in data for key in expected_keys):
                    self.log_test("Dashboard Stats", True, f"Dashboard stats retrieved successfully with all expected sections")
                    return True
                else:
                    missing_keys = [key for key in expected_keys if key not in data]
                    self.log_test("Dashboard Stats", False, f"Dashboard stats missing keys: {missing_keys}", data)
                    return False
            else:
                self.log_test("Dashboard Stats", False, f"Dashboard stats failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Dashboard Stats", False, f"Dashboard stats request failed: {str(e)}")
            return False
    
    def test_health_check(self):
        """Test 0: Health check to verify backend is running"""
        try:
            url = f"{self.base_url}/health"
            response = requests.get(url, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("Health Check", True, "Backend is healthy and running")
                    return True
                else:
                    self.log_test("Health Check", False, "Backend health check returned unhealthy status", data)
                    return False
            else:
                self.log_test("Health Check", False, f"Health check failed with status {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Health check request failed: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting RIDS NGO Backend API Tests")
        print(f"📍 Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence as per review request
        tests = [
            ("Health Check", self.test_health_check),
            ("Auth API Login", self.test_auth_login),
            ("Contact Inquiries API", self.test_contact_inquiry),
            ("Volunteer Applications API", self.test_volunteer_application),
            ("Donations API", self.test_donation_create_order),
            ("Newsletter API", self.test_newsletter_subscription),
            ("Dashboard Stats API", self.test_dashboard_stats),
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            print(f"\n🧪 Running {test_name}...")
            if test_func():
                passed += 1
        
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Backend APIs are working correctly.")
            return True
        else:
            print(f"⚠️  {total - passed} test(s) failed. Check the details above.")
            return False
    
    def get_summary(self):
        """Get test summary for reporting"""
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        summary = {
            "total_tests": total,
            "passed": passed,
            "failed": total - passed,
            "success_rate": f"{(passed/total*100):.1f}%" if total > 0 else "0%",
            "results": self.test_results
        }
        
        return summary

def main():
    """Main test execution"""
    tester = RIDSBackendTester()
    success = tester.run_all_tests()
    
    # Print detailed summary
    summary = tester.get_summary()
    print(f"\n📋 Detailed Summary:")
    print(f"   Total Tests: {summary['total_tests']}")
    print(f"   Passed: {summary['passed']}")
    print(f"   Failed: {summary['failed']}")
    print(f"   Success Rate: {summary['success_rate']}")
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()