using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthService.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "administrator",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    name = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: false),
                    surname = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    administratorname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_administrator", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "administrator_email",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    administrator_id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    email_verified = table.Column<bool>(type: "boolean", nullable: false),
                    email_verification_token = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email_verification_token_expiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_administrator_email", x => x.id);
                    table.ForeignKey(
                        name: "fk_administrator_email_administrator_administrator_id",
                        column: x => x.administrator_id,
                        principalTable: "administrator",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "administrator_password_reset",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    administrator_id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    password_reset_token = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    password_reset_token_expiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_administrator_password_reset", x => x.id);
                    table.ForeignKey(
                        name: "fk_administrator_password_reset_administrator_administrator_id",
                        column: x => x.administrator_id,
                        principalTable: "administrator",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "administrator_profile",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    administrator_id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    profile_picture_url = table.Column<string>(type: "text", nullable: false),
                    bio = table.Column<string>(type: "text", nullable: false),
                    date_of_birth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_administrator_profile", x => x.id);
                    table.ForeignKey(
                        name: "fk_administrator_profile_administrator_administrator_id",
                        column: x => x.administrator_id,
                        principalTable: "administrator",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "administrator_role",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    administrator_id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    role_id = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    assigned_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_administrator_role", x => x.id);
                    table.ForeignKey(
                        name: "fk_administrator_role_role_role_id",
                        column: x => x.role_id,
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_administrator_role_administrator_administrator_id",
                        column: x => x.administrator_id,
                        principalTable: "administrator",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_role_name",
                table: "role",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_administrator_email",
                table: "administrator",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_administrator_administratorname",
                table: "administrator",
                column: "administratorname",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_administrator_email_administrator_id",
                table: "administrator_email",
                column: "administrator_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_administrator_password_reset_administrator_id",
                table: "administrator_password_reset",
                column: "administrator_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_administrator_profile_administrator_id",
                table: "administrator_profile",
                column: "administrator_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_administrator_role_role_id",
                table: "administrator_role",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_administrator_role_administrator_id_role_id",
                table: "administrator_role",
                columns: new[] { "administrator_id", "role_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "administrator_email");

            migrationBuilder.DropTable(
                name: "administrator_password_reset");

            migrationBuilder.DropTable(
                name: "administrator_profile");

            migrationBuilder.DropTable(
                name: "administrator_role");

            migrationBuilder.DropTable(
                name: "role");

            migrationBuilder.DropTable(
                name: "administrator");
        }
    }
}
