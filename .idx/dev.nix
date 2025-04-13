{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.hugo
    pkgs.git
    pkgs.jq
  ];

  env = {
    HUGO_VERSION = "0.121.1";
    NPM_VERSION = "10.2.4";
    NODE_VERSION = "20.10.0";
  };

  idx = {
    extensions = [
        "davidanson.vscode-markdownlint"
        "streetsidesoftware.code-spell-checker"
        "esbenp.prettier-vscode"
        "dbaeumer.vscode-eslint"
        "golang.go"
        "Vue.volar"
        "eamodio.gitlens"
        "github.vscode-pull-request-github"
        "aaron-bond.better-comments"
        "ms-azuretools.vscode-docker"
        "VisualStudioExptTeam.vscodeintellicode"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["hugo" "server"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
