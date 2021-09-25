using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class ChangePropName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tickets",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Tickets",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Lists",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Boards",
                newName: "Title");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Tickets",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Tickets",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Lists",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Boards",
                newName: "Name");
        }
    }
}
