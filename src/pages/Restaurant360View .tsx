import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Menu, Share2, Star, Users, MapPin } from "lucide-react";
import restaurantInterior1 from "../images/1.jpg";
import restaurantBar2 from "../images/2.webp";
import restaurantTerrace3 from "../images/3.webp";
import restaurantKitchen4 from "../images/4.webp";
import restaurantPrivate5 from "../images/5.webp";
import restaurantPrivate6 from "../images/6.webp";


export default function Restaurant360View() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(restaurantInterior1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  const images = [
    { src: restaurantInterior1, name: "Main Dining" },
    { src: restaurantBar2, name: "Bar Area" },
    { src: restaurantTerrace3, name: "Terrace" },
    { src: restaurantKitchen4, name: "Kitchen" },
    { src: restaurantPrivate5, name: "Private Room" },
    { src: restaurantPrivate6, name: "VIP Lounge" }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.domElement.style.borderRadius = "1.5rem";
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    let sphere: THREE.Mesh;
    
    setIsLoading(true);
    textureLoader.load(
      selectedImage,
      (texture) => {
        if (sphere) scene.remove(sphere);
        
        const geometry = new THREE.SphereGeometry(5, 60, 40);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
        });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        setIsLoading(false);
      },
      undefined,
      () => setIsLoading(false)
    );

    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let lon = 0;
    let lat = 0;
    let phi = 0;
    let theta = 0;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      isUserInteracting = true;
      if (event instanceof MouseEvent) {
        onPointerDownMouseX = event.clientX;
        onPointerDownMouseY = event.clientY;
      } else {
        onPointerDownMouseX = event.touches[0].clientX;
        onPointerDownMouseY = event.touches[0].clientY;
      }
    };

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isUserInteracting) return;
      let clientX, clientY;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }
      lon += (onPointerDownMouseX - clientX) * 0.1;
      lat += (clientY - onPointerDownMouseY) * 0.1;
      onPointerDownMouseX = clientX;
      onPointerDownMouseY = clientY;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", onPointerDown);
    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("touchstart", onPointerDown);
    canvas.addEventListener("touchmove", onPointerMove);
    canvas.addEventListener("touchend", onPointerUp);

    const animate = () => {
      requestAnimationFrame(animate);
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const target = new THREE.Vector3();
      target.x = 500 * Math.sin(phi) * Math.cos(theta);
      target.y = 500 * Math.cos(phi);
      target.z = 500 * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(target);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <Card className="relative overflow-hidden border-glass bg-glass backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Downtown • Fine Dining</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Lumina Restaurant
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground">(324 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Seats 120</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={`border-glass bg-glass backdrop-blur-sm transition-spring ${
                  isFavorited 
                    ? "bg-gradient-primary text-white shadow-premium" 
                    : "hover:bg-glass-hover"
                }`}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </Card>

        {/* 360 View Card */}
        <Card className="relative overflow-hidden border-glass bg-glass backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-secondary opacity-5" />
          <div className="relative p-2">
            <div
              ref={mountRef}
              className="relative h-[70vh] w-full overflow-hidden rounded-2xl bg-secondary/20"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 backdrop-blur-sm">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                </div>
              )}
              <div className="absolute bottom-4 left-4 z-10 rounded-xl bg-glass border border-glass backdrop-blur-sm px-3 py-2 text-sm font-medium text-foreground shadow-glass">
                Drag to explore • Pinch to zoom
              </div>
            </div>
          </div>
        </Card>

        {/* Scene Selection */}
        <Card className="border-glass bg-glass backdrop-blur-xl">
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Explore Areas</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-spring ${
                    selectedImage === image.src
                      ? "border-glass bg-gradient-primary p-1 shadow-premium"
                      : "border-glass/50 hover:border-glass hover:shadow-soft"
                  }`}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="h-full w-full overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.name}
                      className="h-full w-full object-cover transition-spring group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-glass border-t border-glass backdrop-blur-sm p-2">
                    <p className="text-xs font-medium text-center text-foreground">
                      {image.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Button className="h-14 bg-gradient-primary text-white shadow-premium transition-spring hover:shadow-glass hover:scale-[1.02]">
            <Calendar className="mr-2 h-5 w-5" />
            Reserve Table
          </Button>
          <Button
            variant="outline"
            className="h-14 border-glass bg-glass backdrop-blur-sm transition-spring hover:bg-glass-hover hover:scale-[1.02]"
          >
            <Menu className="mr-2 h-5 w-5" />
            View Menu
          </Button>
          <Button
            variant="outline"
            className="h-14 border-glass bg-glass backdrop-blur-sm transition-spring hover:bg-glass-hover hover:scale-[1.02]"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}