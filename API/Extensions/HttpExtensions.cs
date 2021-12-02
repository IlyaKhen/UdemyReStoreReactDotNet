using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.RequestHelpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaganationHeader(this HttpResponse responce, MetaData metaData)
        {
            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            responce.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
            responce.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}