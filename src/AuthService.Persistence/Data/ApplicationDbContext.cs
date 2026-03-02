using AuthService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Persistence.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        
    }

    //Representacion de trabblas en el modelo 
    //(Cada uno es una tabla en la base de datos)
    public DbSet<Administrator> Administrators { get; set; }
    public DbSet<AdministratorProfile> AdministratorProfiles { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<AdministratorRole> AdministratorRoles { get; set; }
    public DbSet<AdministratorEmail> AdministratorEmails { get; set; }
    public DbSet<AdministratorPasswordReset> AdministratorPasswordReset { get; set; }

    
    

//Convierte camel case a snake_case para los nombres de tablas y columnas en la base de datos
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    foreach (var entity in modelBuilder.Model.GetEntityTypes())
    {
        var tableName = entity.GetTableName();
        if (!string.IsNullOrEmpty(tableName))
        {
            entity.SetTableName(ToSnakeCase(tableName));
        }
        foreach (var property in entity.GetProperties())
        {
            var columnName = property.GetColumnName();
            if (!string.IsNullOrEmpty(columnName))
            {
                property.SetColumnName(ToSnakeCase(columnName));
            }  
        }
    }


//------------------------------------------------//
//Configuracion especifica de la entidad administrator
//------------------------------------------------//
modelBuilder.Entity<Administrator>(entity =>
{
    //Llave primaria
    entity.HasKey(e => e.Id);

    entity.HasIndex(e => e.Email).IsUnique();
    entity.HasIndex(e => e.Administratorname).IsUnique();

    //Relacion de 1:1 con AdministratorProfile
    entity.HasOne(e => e.AdministratorProfile)
        .WithOne(p => p.Administrator)
        .HasForeignKey<AdministratorProfile>(p => p.AdministratorId)
        .OnDelete(DeleteBehavior.Cascade);

    //Relacion de 1:N con AdministratorRoles
    entity.HasMany(e => e.AdministratorRoles)
        .WithOne(ur => ur.Administrator)
        .HasForeignKey(ur => ur.AdministratorId)
        .OnDelete(DeleteBehavior.Cascade);

    //Relacion 1:1 con AdministratorEmail
    entity.HasOne(e => e.AdministratorEmail)
        .WithOne(ue => ue.Administrator)
        .HasForeignKey<AdministratorEmail>(ue => ue.AdministratorId)
        .OnDelete(DeleteBehavior.Cascade);

    //Relacion 1:N con AdministratorPasswordReset
    entity.HasOne(e => e.AdministratorPasswordReset)
        .WithOne(upr => upr.Administrator)
        .HasForeignKey<AdministratorPasswordReset>(upr => upr.AdministratorId)
        .OnDelete(DeleteBehavior.Cascade);      
});


//Cnfiguracion especifica de la entidad administratorRole
modelBuilder.Entity<AdministratorRole>(entity =>
{
    //Llave primario
    entity.HasKey(e => e.Id);
    //El usuario no puede tener el mismo rol mas de una vez
    entity .HasIndex(e => new { e.AdministratorId, e.RoleId }).IsUnique();
});

//------------------------------------------------//
//Configuracion especifica de la entidad Role
//------------------------------------------------//
modelBuilder.Entity<Role>(entity =>
{
    //Llave primaria
    entity.HasKey(e => e.Id);
    //El nombre del rol debe ser unico
    entity.HasIndex(e => e.Name).IsUnique();
});

}
//-----------------------------------------------//


    //Funcion para configrar el nombre de clase a nombre de DB en formato snake_case
    private static string ToSnakeCase(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;

        return string.Concat(
            input.Select((x, i) => i > 0 && char.IsUpper(x) 
                ? "_" + x.ToString().ToLower() 
                : x.ToString().ToLower())
        );
    }
}