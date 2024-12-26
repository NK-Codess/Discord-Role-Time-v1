const { PermissionsBitField } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "role",
  async execute(message, args, client) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.reply({ content: ":x: You do not have the necessary permissions to use this command.", ephemeral: true });
    }

    let user = message.mentions.users.first();
    let rolee = message.mentions.roles.first();
    let time = args[2];
    
    if (!user) {
      return message.reply("Please mention a user.");
    }

    if (!role) {
      return message.reply("Please mention a role.");
    }

    if (!time) {
      return message.reply("Please specify the duration.");
    }

    let timeValue = parseInt(time);
    let timeUnit = time.replace(timeValue.toString(), "").toLowerCase();

    let duration;
    switch (timeUnit) {
      case "m":
        duration = timeValue * 60 * 1000;
        break;
      case "h":
        duration = timeValue * 60 * 60 * 1000;
        break;
      case "d":
        duration = timeValue * 24 * 60 * 60 * 1000;
        break;
      default:
        return message.reply("Invalid time unit. Please use `m` for minutes, `h` for hours, or `d` for days.");
    }

    let member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply("User is not in the server.");
    }
     

    await member.roles.add(rolee);
    await message.reply(`${user.username} has been gives the role\nduration of: ${timeValue}${timeUnit}.`);

    setTimeout(async () => {
      await member.roles.remove(rolee);
      await message.reply(`${user.username} has been removed the role.`);
    }, duration);
  },
};
