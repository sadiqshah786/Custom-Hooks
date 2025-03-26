import { useBatteryStatus, useNetwork, useClipboard, useOrientation, useSize, useFullscreen } from "react-haiku";
import { BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, Wifi, WifiOff, RotateCcw, Clipboard, Expand, Maximize, Minimize } from "lucide-react";
import { useRef, useEffect } from "react";
import styles from "./Haiku.module.css"; // Import CSS module

const Haiku = () => {
  const { level, isCharging } = useBatteryStatus();
  const online = useNetwork();
  const clipboard = useClipboard({ timeout: 2000 });
  const orientation = useOrientation();
  const elementRef = useRef(null);
  const { width, height } = useSize(elementRef);
  const documentRef = useRef<HTMLElement | null>(null);
  useEffect(() => { documentRef.current = document.documentElement; }, []);
  const { isFullscreen, toggleFullscreen } = useFullscreen(documentRef);

  const getBatteryIcon = () =>
    isCharging ? <BatteryCharging className={styles.batteryCharging} /> :
    level > 75 ? <BatteryFull className={styles.batteryFull} /> :
    level > 40 ? <BatteryMedium className={styles.batteryMedium} /> :
    <BatteryLow className={styles.batteryLow} />;

  const hookData = [
    { title: "Battery", value: `${level}%`, icon: getBatteryIcon() },
    { title: "Network", value: online ? "Online" : "Offline", icon: online ? <Wifi className={styles.networkOnline} /> : <WifiOff className={styles.networkOffline} /> },
    { title: "Orientation", value: orientation, icon: <RotateCcw className={styles.orientationIcon} /> },
    { title: "Clipboard", value: clipboard.copied ? "Copied!" : "Click to Copy", icon: <button onClick={() => clipboard.copy("Haiku Rocks!")}><Clipboard className={styles.clipboardIcon} /></button> },
    { title: "Size", value: `W: ${width}px | H: ${height}px`, icon: <Expand className={styles.sizeIcon} /> },
    { title: "Fullscreen", value: isFullscreen ? "Active" : "Inactive", icon: <button onClick={toggleFullscreen}>{isFullscreen ? <Minimize className={styles.fullscreenIcon} /> : <Maximize className={styles.fullscreenIcon} />}</button> },
  ];

  return (
    <div ref={elementRef} className={styles.container}>
      <h1 className={styles.title}>Haiku - Custom Hooks</h1>
      <div className={styles.grid}>
        {hookData.map((hook, i) => (
          <div key={i} className={styles.card}>
            <div>
              <p className={styles.cardTitle}>{hook.title}</p>
              <p className={styles.cardValue}>{hook.value}</p>
            </div>
            {hook.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Haiku;
