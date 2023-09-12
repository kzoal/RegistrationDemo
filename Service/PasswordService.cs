using System;
using System.Security.Cryptography;
using System.Text;

namespace RegistrationDemo.Service
{
    public class PasswordService
    {
        public static string CreateSalt()
        {
            RNGCryptoServiceProvider rng    = new RNGCryptoServiceProvider();
            byte[] buff                     = new byte[64];
            rng.GetBytes(buff);
            return System.Convert.ToBase64String(buff);
        }

        public static byte[] HashPasswordAndSalt(string password, string salt)
        {
            UnicodeEncoding encoding    = new UnicodeEncoding();
            string passwordAndSalt      = string.Concat(password, salt);
            byte[] hashBytes            = encoding.GetBytes(passwordAndSalt);
            SHA1 sha1                   = new SHA1CryptoServiceProvider();
            byte[] cryptPassword        = sha1.ComputeHash(hashBytes);
            return cryptPassword;
        }
    }
}