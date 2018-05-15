为CA生成私钥

   openssl genrsa -out ca-key.pem -des 1024

通过CA私钥生成CSR

   openssl req -new -key ca-key.pem -out ca-csr.pem

通过CSR文件和私钥生成CA证书

   openssl x509 -req -in ca-csr.pem -signkey ca-key.pem -out ca-cert.pem
 

## Steps to generate self-signed PKCS#12 SSL certificate and export its keys:
                 
1- Create PKCS#12 keystore (.p12 or .pfx file)

    keytool -genkeypair -keystore myKeystore.p12 -storetype PKCS12 -storepass MY_PASSWORD -alias KEYSTORE_ENTRY -keyalg RSA -keysize 2048 -validity 99999 -dname "CN=My SSL Certificate, OU=My Team, O=My Company, L=My City, ST=My State, C=SA" -ext san=dns:mydomain.com,dns:localhost,ip:127.0.0.1
    
- `myKeystore.p12` = keystore filename. It can with .pfx extension as well.
- `MY_PASSWORD` = password used for the keystore and the private key as well.
- `CN` = commonName, it will be shown as certiciate name in certificates list.
- `OU` = organizationUnit, department name for example.
- `O` = organizationName, the company name.
- `L` = localityName, the city.
- `S` = stateName, the state.
- `C` = country, the 2-letter code of the country.

> Note: This step can be done using openssl but it's more complicated.
                     
2- Create the public certificate (has the header `-----BEGIN CERTIFICATE-----`):

Using `keytool`:

    keytool -exportcert -keystore myKeystore.p12 -storepass MY_PASSWORD -alias KEYSTORE_ENTRY -rfc -file public-certificate.pem

Or using `openssl`:

    openssl pkcs12 -in myKeystore.p12 -password pass:MY_PASSWORD -nokeys -out public-certificate.pem
    
> Note: Import public-certificate.pem into browsers to trust it. Add it to "Trusted Root Certification Authorities" certificate store.

3- Export the private key (has the header `-----BEGIN PRIVATE KEY-----`):

    openssl pkcs12 -in myKeystore.p12 -password pass:MY_PASSWORD -nodes -nocerts -out private-key.key
    
4- Export the public key from the private key (has the header `-----BEGIN PUBLIC KEY-----`):

    openssl rsa -in private-key.key -pubout > public-key.pub
