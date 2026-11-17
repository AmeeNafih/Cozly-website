#!/usr/bin/env bash
# COZLY by Zoffaro IN - Local Service Controller
ACTION=${1:-status}

case "$ACTION" in
  start)
    systemctl --user start cozly
    echo "✓ COZLY service started."
    echo "• Local:   http://localhost:3000"
    echo "• LAN:     http://$(hostname -I | awk '{print $1}'):3000"
    ;;
  stop)
    systemctl --user stop cozly
    echo "✓ COZLY service stopped."
    ;;
  restart)
    systemctl --user restart cozly
    echo "✓ COZLY service restarted."
    ;;
  status)
    systemctl --user status cozly --no-pager
    ;;
  logs)
    journalctl --user -u cozly -f -n 50
    ;;
  open)
    xdg-open http://localhost:3000
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status|logs|open}"
    exit 1
    ;;
esac
