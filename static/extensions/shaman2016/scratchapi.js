// Name: Scratch Api
// ID: ScratchApi8787
// Description: An extension for interacting with the Scratch Api.
// By: Shaman2016 <https://scratch.mit.edu/users/Shaman2016/>
// License: MIT
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }
  let ext_data = {
    "x-token": "",
    "user": "",
  }

    class ScratchApi {
      getInfo() {
        return {
          id: "Scratch Api",
          name: "ScratchApi8787",
          color1: "#a3c0e1",
          blocks: [
            {
              opcode: "GetUser",
              blockType: Scratch.BlockType.OBJECT,
              text: "get user object [user]",
              arguments: {
                user: {
                  defaultValue: "griffpatch",
                  type: Scratch.ArgumentType.STRING,
                },
              },
            },
            {
              opcode: "GetProject",
              blockType: Scratch.BlockType.OBJECT,
              text: "get project object [id]",
              arguments: {
                id: {
                  defaultValue: "612229554",
                  type: Scratch.ArgumentType.STRING,
                },
              },
            },
            {
              opcode: "GetStudio",
              blockType: Scratch.BlockType.OBJECT,
              text: "get studio object [id]",
              arguments: {
                id: {
                  defaultValue: "36416387",
                  type: Scratch.ArgumentType.STRING,
                },
              },
            },
            {
              blockType: Scratch.BlockType.LABEL,
              text: "Log In",
            },
            {
              opcode: "LogInToken",
              blockType: Scratch.BlockType.COMMAND,
              text: "Log in to Scratch as [user] with the X-Token [pass].",
              arguments: {
                user: {
                  defaultValue: "user",
                  type: Scratch.ArgumentType.STRING,
                },
                pass: {
                  defaultValue: "ScratchSessionId",
                  type: Scratch.ArgumentType.STRING,
                },
              },
            },
            {
              blockType: Scratch.BlockType.LABEL,
              text: "Messages and statuses",
            }, {
              opcode: "getStatus",
              blockType: Scratch.BlockType.REPORTER,
              text: "Get Account Status",
              arguments: {},
            }, {
              opcode: "getMyMessages",
              blockType: Scratch.BlockType.REPORTED,
              text: "Get My Messages",
              arguments: {},
            }, {
              opcode: "getMyWarns",
              blockType: Scratch.BlockType.REPORTER,
              text: "Get My Warns",
              arguments: {},
            },
          ],
        };
      }
async GetUser(args) {
  return fetch(`https://shaman2016-trampline.vercel.app/scratch/users/${args.user}/`)
}
async GetProject(args) {
  return fetch(`https://shaman2016-trampline.vercel.app/scratch/projects/${args.id}/`)
}
async GetStudio(args) {
  return fetch(`https://shaman2016-trampline.vercel.app/scratch/studios/${args.id}/`)
}
async LogInToken(args) {
  ext_data.user = args.user; ext_data["x-token"] = args.pass;
}
async getStatus() {
  let i = fetch(`https://shaman2016-trampline.vercel.app/scratch/users/${ext_data.user}/messages/`, JSON.parse({"headers":{"X-Token":ext_data["x-token"]}}))
  let i2 = "Wait a bit"
  if(i.status===403){i2 = "ban"}else if(i.status===200){i2 = "noban"}else{i2 = i.status}
  return i2
}
async getMyMessages() {
  fetch(`https://shaman2016-trampline.vercel.app/scratch/users/${ext_data.user}/messages/`, JSON.parse({"headers":{"X-Token":ext_data["x-token"]}}))
  return response.json().count
}
async getMyWarns() {
  fetch(`https://shaman2016-trampline.vercel.app/scratch/users/${ext_data.user}/messages/admin`, JSON.parse({"headers":{"X-Token":ext_data["x-token"]}}))
  return response.json().count
}
    }
    Scratch.extensions.register(new ScratchApi());
  })(Scratch);
