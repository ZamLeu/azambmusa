import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export interface SectionMenuItem {
  id: string;
  key: string;
  title: string;
  subtitle: string;
}

export const TERMINAL_SECTIONS: SectionMenuItem[] = [
  { id: 'projects', key: '1', title: '01. KEY PROJECTS', subtitle: 'Link1t / TouchByTiha / BuddyUp' },
  { id: 'experience', key: '2', title: '02. EXPERIENCE', subtitle: 'USAS AI Iris / ADS Web Intern' },
  { id: 'skills', key: '3', title: '03. TECH STACK', subtitle: 'Full-Stack / Cloud / Mobile' },
  { id: 'education', key: '4', title: '04. EDUCATION', subtitle: 'USAS BCS (Hons) / KV Sepang' },
  { id: 'certifications', key: '5', title: '05. CERTIFICATIONS', subtitle: 'IBM Gen-AI & AI Developer' },
  { id: 'contact', key: '6', title: '06. TRANSMIT MSG', subtitle: 'Direct Channels & Socials' },
];

export class RetroTerminal3D {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private rootGroup: THREE.Group;
  private screenCanvas!: HTMLCanvasElement;
  private screenTexture!: THREE.CanvasTexture;
  private screenMesh!: THREE.Mesh;
  private animId: number | null = null;
  private isVisible: boolean = true;
  private observer: IntersectionObserver | null = null;

  // Interaction & Raycasting
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private isDragging = false;
  private isHovered = false;
  private dragDistance = 0;
  private previousMousePosition = { x: 0, y: 0 };
  private targetRotation = { x: 0.12, y: -0.32 };
  private currentRotation = { x: 0.12, y: -0.32 };
  private time = 0;

  // Interactive Menu State
  public activeIndex = 0;
  private onSelectSectionCallback?: (sectionId: string) => void;

  // Camera Zoom Animation state (tuned for compact cute Macintosh)
  private baseCameraZ = 7.0;
  private targetCameraZ = 7.0;
  private baseCameraY = 0.85;
  private targetCameraY = 0.85;
  private isDiving = false;

  constructor(
    container: HTMLElement,
    onSelectSection?: (sectionId: string) => void
  ) {
    this.container = container;
    this.onSelectSectionCallback = onSelectSection;
    this.scene = new THREE.Scene();
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 380;

    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    this.camera.position.set(0, this.baseCameraY, this.baseCameraZ);
    this.camera.lookAt(0, 0.25, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);

    container.appendChild(this.renderer.domElement);

    this.buildTerminal();
    this.bindEvents();
    this.bindObserver();
    this.start();
  }

  public updateScreen(): void {
    if (!this.screenCanvas) return;
    const ctx = this.screenCanvas.getContext('2d')!;

    // Black CRT Screen Background
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, 512, 384);

    // Subtle Scanlines
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let y = 0; y < 384; y += 4) {
      ctx.fillRect(0, y, 512, 2);
    }

    // Top OS Bar
    ctx.fillStyle = '#EA580C';
    ctx.fillRect(16, 16, 480, 26);
    ctx.fillStyle = '#0D0D0D';
    ctx.font = 'bold 12px "Space Mono", monospace';
    ctx.fillText('ZM_OS // SYSTEM WORKSTATION v2.6', 26, 34);

    ctx.fillStyle = '#0D0D0D';
    ctx.font = '10px "Space Mono", monospace';
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    ctx.fillText(`SYS.ONLINE | ${timeStr}`, 360, 34);

    // Subtitle & Status
    ctx.fillStyle = '#A0A09C';
    ctx.font = '11px "Space Mono", monospace';
    ctx.fillText('SELECT A SYSTEM MODULE TO EXECUTE :', 20, 68);

    // Interactive Menu Options
    const startY = 92;
    const rowH = 38;

    TERMINAL_SECTIONS.forEach((item, idx) => {
      const y = startY + idx * rowH;
      const isSelected = idx === this.activeIndex;

      if (isSelected) {
        // High-contrast selection bar
        ctx.fillStyle = '#F4F4F2';
        ctx.fillRect(20, y - 18, 472, 32);

        ctx.fillStyle = '#0D0D0D';
        ctx.font = 'bold 13px "Space Mono", monospace';
        ctx.fillText(`▶ [${item.key}] ${item.title}`, 28, y + 3);

        ctx.fillStyle = '#555552';
        ctx.font = 'bold 11px "Space Mono", monospace';
        ctx.fillText(item.subtitle, 240, y + 2);
      } else {
        ctx.fillStyle = '#E5E5E2';
        ctx.font = '12px "Space Mono", monospace';
        ctx.fillText(`  [${item.key}] ${item.title}`, 28, y + 3);

        ctx.fillStyle = '#8E8E8A';
        ctx.font = '11px "Space Mono", monospace';
        ctx.fillText(item.subtitle, 240, y + 2);
      }
    });

    // Bottom Action Prompt Banner
    ctx.fillStyle = '#F4F4F2';
    ctx.fillRect(22, 332, 468, 26);
    ctx.fillStyle = '#0D0D0D';
    ctx.font = 'bold 12px "Space Mono", monospace';
    ctx.fillText('⚡ CLICK MONITOR TO EXECUTE & LAUNCH SECTION ⚡', 40, 350);

    if (this.screenTexture) {
      this.screenTexture.needsUpdate = true;
    }
  }

  private createScreenCanvas(): THREE.CanvasTexture {
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 512;
    this.screenCanvas.height = 384;
    this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);
    this.screenTexture.magFilter = THREE.NearestFilter;
    this.screenTexture.minFilter = THREE.NearestFilter;
    this.updateScreen();
    return this.screenTexture;
  }

  private buildTerminal(): void {
    // Exact Website Theme Tokens: High-contrast retro monochrome ink & paper
    const chassisMat = new THREE.MeshBasicMaterial({ color: 0xF4F4F2 });
    const darkMat = new THREE.MeshBasicMaterial({ color: 0x0D0D0D });
    const lineMat = new THREE.LineBasicMaterial({ color: 0x0D0D0D, linewidth: 2 });
    const safetyOrangeMat = new THREE.MeshBasicMaterial({ color: 0xF97316 });
    const silverMat = new THREE.MeshBasicMaterial({ color: 0xD4D4D0 });

    // Helper: Chamfered Rounded Box with crisp 2-pixel retro ink outlines
    const createBeveledBoxWithOutline = (
      w: number,
      h: number,
      d: number,
      radius: number,
      mat: THREE.Material
    ): THREE.Group => {
      const group = new THREE.Group();
      // segments = 1 creates the classic 1980s chamfered bevels!
      const geo = new RoundedBoxGeometry(w, h, d, 1, radius);
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Clean contour lines outlining the chamfered facets
      const wireGeo = new THREE.EdgesGeometry(geo, 15);
      const line = new THREE.LineSegments(wireGeo, lineMat);
      group.add(line);

      return group;
    };

    // ===============================================================
    // CUTE COMPACT MACINTOSH (Pure Stylized Retro Ink-Art Aesthetic)
    // ===============================================================
    const macGroup = new THREE.Group();
    macGroup.position.set(0, 0.5, 0);

    // 1. MAIN MONOLITHIC CHASSIS (Soft chamfered bevels - radius: 0.16)
    const bodyBox = createBeveledBoxWithOutline(2.9, 3.3, 2.4, 0.16, chassisMat);
    macGroup.add(bodyBox);

    // 2. RECESSED TOP CARRY HANDLE
    const handleIndent = createBeveledBoxWithOutline(1.3, 0.28, 0.75, 0.06, darkMat);
    handleIndent.position.set(0, 1.55, -0.15);
    macGroup.add(handleIndent);

    const handleBar = createBeveledBoxWithOutline(1.15, 0.08, 0.22, 0.03, chassisMat);
    handleBar.position.set(0, 1.62, -0.15);
    macGroup.add(handleBar);

    // 3. FRONT BEZEL WITH SOFT BEVEL & ERGONOMIC UPWARD TILT
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.35, 1.21);
    screenGroup.rotation.x = -0.05; // 3-degree upward tilt

    // Bezel Frame
    const bezel = createBeveledBoxWithOutline(2.64, 2.06, 0.1, 0.12, chassisMat);
    screenGroup.add(bezel);

    // CRT Screen Surface (Optimized for 100% crystal-clear readability)
    const screenTexture = this.createScreenCanvas();
    const screenGeo = new THREE.PlaneGeometry(2.46, 1.84);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    this.screenMesh = new THREE.Mesh(screenGeo, screenMat);
    this.screenMesh.position.set(0, 0, 0.06);
    screenGroup.add(this.screenMesh);

    // Crisp Screen Edge Border
    const screenFrame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.48, 1.86, 0.02)),
      lineMat
    );
    screenFrame.position.set(0, 0, 0.07);
    screenGroup.add(screenFrame);

    macGroup.add(screenGroup);

    // 4. ICONIC MACINTOSH "CHIN" (Below the screen)
    // A. Single Sleek 3.5" Floppy Disk Slot (The "smile")
    const floppySlot = createBeveledBoxWithOutline(1.05, 0.08, 0.06, 0.03, darkMat);
    floppySlot.position.set(0.45, -0.92, 1.22);
    macGroup.add(floppySlot);

    // Floppy Eject Pin Hole / Latch
    const ejectPin = createBeveledBoxWithOutline(0.05, 0.05, 0.04, 0.02, silverMat);
    ejectPin.position.set(1.08, -0.92, 1.22);
    macGroup.add(ejectPin);

    // Drive Activity Safety Orange LED
    const driveLed = new THREE.Mesh(
      new RoundedBoxGeometry(0.06, 0.06, 0.04, 1, 0.02),
      safetyOrangeMat
    );
    driveLed.position.set(-0.15, -0.92, 1.22);
    macGroup.add(driveLed);

    // B. Cute Front Badge (ZM_OS / Pixel Cat placement)
    const logoBadge = createBeveledBoxWithOutline(0.32, 0.32, 0.04, 0.06, darkMat);
    logoBadge.position.set(-0.95, -0.92, 1.22);
    macGroup.add(logoBadge);

    // Tiny Safety Orange Accent Core inside Badge
    const badgeCore = new THREE.Mesh(
      new RoundedBoxGeometry(0.14, 0.14, 0.05, 1, 0.03),
      safetyOrangeMat
    );
    badgeCore.position.set(-0.95, -0.92, 1.23);
    macGroup.add(badgeCore);

    // 5. SIDE & REAR RETRO DETAILS (Apple "Snow White" vertical cooling lines)
    // Left Side Vertical Cooling Slats
    for (let s = 0; s < 5; s++) {
      const slatL = createBeveledBoxWithOutline(0.04, 0.8, 0.06, 0.02, darkMat);
      slatL.position.set(-1.47, -0.4, -0.4 + s * 0.2);
      macGroup.add(slatL);
    }

    // Right Side Vertical Cooling Slats
    for (let s = 0; s < 5; s++) {
      const slatR = createBeveledBoxWithOutline(0.04, 0.8, 0.06, 0.02, darkMat);
      slatR.position.set(1.47, -0.4, -0.4 + s * 0.2);
      macGroup.add(slatR);
    }

    // Rear Connection Port Panel (Backplate)
    const rearPort = createBeveledBoxWithOutline(1.2, 0.35, 0.04, 0.05, darkMat);
    rearPort.position.set(0, -1.0, -1.22);
    macGroup.add(rearPort);

    // 6. BOTTOM PEDESTAL FEET
    const footFront = createBeveledBoxWithOutline(2.7, 0.08, 0.2, 0.03, darkMat);
    footFront.position.set(0, -1.68, 0.9);
    macGroup.add(footFront);

    const footBack = createBeveledBoxWithOutline(2.7, 0.08, 0.2, 0.03, darkMat);
    footBack.position.set(0, -1.68, -0.9);
    macGroup.add(footBack);

    this.rootGroup.add(macGroup);

    // ===============================================================
    // 7. COMPACT MATCHING RETRO KEYBOARD
    // ===============================================================
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0, -1.18, 1.7);
    kbGroup.rotation.x = 0.15; // Slanted keyboard angle

    // Compact Keyboard Body (Curved chamfered corners)
    const kbBody = createBeveledBoxWithOutline(2.8, 0.18, 1.2, 0.08, chassisMat);
    kbGroup.add(kbBody);

    // Sculpted Key Rows
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 9; c++) {
        const keyW = 0.22;
        const keyD = 0.17;
        const kx = (c - 4) * 0.28;
        const kz = -0.28 + r * 0.22;
        const isAccent = (r === 0 && c === 0); // Safety Orange Esc Key!
        const isMod = c === 0 || c === 8;
        const key = createBeveledBoxWithOutline(
          keyW, 
          0.07, 
          keyD, 
          0.03,
          isAccent ? safetyOrangeMat : (isMod ? darkMat : chassisMat)
        );
        key.position.set(kx, 0.11, kz);
        kbGroup.add(key);
      }
    }

    // Spacebar
    const spacebar = createBeveledBoxWithOutline(1.3, 0.07, 0.18, 0.03, chassisMat);
    spacebar.position.set(0, 0.10, 0.38);
    kbGroup.add(spacebar);

    this.rootGroup.add(kbGroup);
  }

  public setActiveSection(index: number): void {
    if (index >= 0 && index < TERMINAL_SECTIONS.length) {
      this.activeIndex = index;
      this.updateScreen();
    }
  }

  public triggerLaunchCurrentSection(targetId?: string): void {
    const section = targetId 
      ? TERMINAL_SECTIONS.find(s => s.id === targetId) || TERMINAL_SECTIONS[this.activeIndex]
      : TERMINAL_SECTIONS[this.activeIndex];
    if (!section) return;

    // Trigger Camera dive straight into Macintosh CRT monitor
    this.isDiving = true;
    this.targetCameraZ = 1.7;
    this.targetCameraY = 0.85;
    this.targetRotation = { x: 0, y: 0 };

    setTimeout(() => {
      // Notify parent to open Computer Environment
      if (this.onSelectSectionCallback) {
        this.onSelectSectionCallback(section.id);
      }
    }, 320);
  }

  public resetOrientation(): void {
    this.isDiving = false;
    this.targetRotation = { x: 0.12, y: -0.32 };
    this.targetCameraZ = this.baseCameraZ;
    this.targetCameraY = this.baseCameraY;
    this.updateScreen();
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.onResize, { passive: true });

    const el = this.container;
    el.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    el.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchEnd);
  }

  private bindObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animId) {
          this.animate();
        }
      });
    }, { threshold: 0.05 });

    this.observer.observe(this.container);
  }

  private onMouseDown = (e: MouseEvent): void => {
    this.isDragging = true;
    this.dragDistance = 0;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  private onMouseMove = (e: MouseEvent): void => {
    const rect = this.container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.mouse.set(x, y);

    if (this.isDragging) {
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

      this.targetRotation.y += deltaX * 0.007;
      this.targetRotation.x += deltaY * 0.007;

      // Clamp X rotation to keep upright
      this.targetRotation.x = Math.max(-0.35, Math.min(0.45, this.targetRotation.x));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    } else {
      // Raycast to check hover over CRT screen
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.screenMesh);
      const wasHovered = this.isHovered;
      this.isHovered = intersects.length > 0;

      if (this.isHovered !== wasHovered) {
        this.container.style.cursor = this.isHovered ? 'pointer' : 'grab';
      }
    }
  };

  private onMouseUp = (e: MouseEvent): void => {
    if (this.isDragging && this.dragDistance < 6) {
      // It's a genuine click, not a drag orbit
      const rect = this.container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.mouse.set(x, y);

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.screenMesh);

      if (intersects.length > 0) {
        this.triggerLaunchCurrentSection();
      }
    }
    this.isDragging = false;
  };

  private onTouchStart = (e: TouchEvent): void => {
    if (e.touches.length === 1) {
      this.isDragging = true;
      this.dragDistance = 0;
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  private onTouchMove = (e: TouchEvent): void => {
    if (this.isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

      this.targetRotation.y += deltaX * 0.007;
      this.targetRotation.x += deltaY * 0.007;
      this.targetRotation.x = Math.max(-0.35, Math.min(0.45, this.targetRotation.x));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  private onTouchEnd = (): void => {
    if (this.isDragging && this.dragDistance < 10) {
      this.triggerLaunchCurrentSection();
    }
    this.isDragging = false;
  };

  private onResize = (): void => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private animate = (): void => {
    if (!this.isVisible) {
      this.animId = null;
      return;
    }

    this.animId = requestAnimationFrame(this.animate);
    this.time += 0.015;

    // Smooth rotation interpolation
    if (!this.isDragging && !this.isDiving) {
      // Gentle idle breathing sway
      const idleY = Math.sin(this.time * 0.4) * 0.05;
      this.currentRotation.y += (this.targetRotation.y + idleY - this.currentRotation.y) * 0.05;
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
    } else {
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    }

    // Camera dive interpolation
    this.camera.position.z += (this.targetCameraZ - this.camera.position.z) * 0.1;
    this.camera.position.y += (this.targetCameraY - this.camera.position.y) * 0.1;

    this.rootGroup.rotation.y = this.currentRotation.y;
    this.rootGroup.rotation.x = this.currentRotation.x;

    this.renderer.render(this.scene, this.camera);
  };

  public start(): void {
    if (!this.animId) {
      this.animate();
    }
  }

  public destroy(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.renderer && this.renderer.domElement) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
  }
}
