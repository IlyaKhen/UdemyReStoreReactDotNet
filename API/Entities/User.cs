using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<int> // int - override a string as PK that default for identity
    {
        public UserAddress Address { get; set; }
    }
}