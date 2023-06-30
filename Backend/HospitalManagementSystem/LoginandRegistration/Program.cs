using Microsoft.EntityFrameworkCore;
using LoginandRegistration.Models;
using LoginandRegistration.Models.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using LoginandRegistration.Interfaces;
using LoginandRegistration.Services;

namespace LoginandRegistration
{
    public class Program
    {
        public static void Main(string[] args)
       {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<UserContext>(opts =>
            {
                opts.UseSqlServer(builder.Configuration.GetConnectionString("conn"));
            });
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(options =>  
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });

            builder.Services.AddScoped<IManageUser, ManageUserService>();
            builder.Services.AddScoped<IRepo<User ,int>,UserRepo>();
            builder.Services.AddScoped<IRepo<Doctor, int>,DoctorRepo>();
            builder.Services.AddScoped<IRepo<Patient, int>,PatientRepo>();
            builder.Services.AddScoped<IGenerateToken,GenerateTokenService>();
            builder.Services.AddScoped<IRepo<Admin,int>, AdminRepo>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}