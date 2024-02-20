import requests

def get_cves_for_cwe(cwe_id, search=None, vendor=None, product=None, cvss='critical', page=1, username=None, password=None):
    url = f"https://www.opencve.io/api/cwe/{cwe_id}"
    params = {'search': search, 'vendor': vendor, 'product': product, 'cvss': cvss, 'page': page}
    
    # Include authentication if username and password are provided
    if username and password:
        auth = (username, password)
    else:
        auth = None
    
    response = requests.get(url, params=params, auth=auth)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to get CVEs for CWE {cwe_id}. Status code: {response.status_code}")
        return None

# Example usage with authentication:
cwe_id = "CWE-68"
username = "vaibhav"
password = "Vaibhav@123"
cves = get_cves_for_cwe(cwe_id, username=username, password=password)
if cves:
    print(cves)
