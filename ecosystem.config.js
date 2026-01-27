module.exports = {
    apps: [
        {
            name: "asuim-dashboard",
            cwd: "/opt/builds/asimthecat/asuim-dashboard",

            script: "node_modules/next/dist/bin/next",
            args: "start -p 4001",

            env: {
                NODE_ENV: "production",
                PORT: 4001,
            },

            // pm2 ayarları
            instances: 1,
            exec_mode: "fork",

            autorestart: true,
            watch: false,

            max_memory_restart: "512M",

            // loglar
            out_file: "/opt/logs/asuim-dashboard.out.log",
            error_file: "/opt/logs/asuim-dashboard.err.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss",
        },
    ],
};
