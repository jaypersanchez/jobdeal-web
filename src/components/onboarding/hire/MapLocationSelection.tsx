import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import MapPicker from "react-google-map-picker";

export interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
}

interface Props {
  onClose: () => void;
  location?: LocationInfo;
  onChange: (location: LocationInfo) => void;
}

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";

const DefaultLocation = { lat: 10, lng: 106, address: "" };
const DefaultZoom = 10;

export default function MapLocationSelection({
  onClose,
  location: currentLocation = DefaultLocation,
  onChange,
}: Props) {
  const [location, setLocation] = useState(currentLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom);
  }

  //   function handleResetLocation() {
  //     setLocation({ ...DefaultLocation });
  //     setZoom(DefaultZoom);
  //   }

  function handleChangeLocation(lat: number, lng: number) {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setLocation({ lat, lng, address: `${data.}` });
      });
  }

  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-screen-lg transform overflow-hidden bg-[#17181A] transition-all rounded`}
              >
                <MapPicker
                  defaultLocation={location}
                  zoom={zoom}
                  mapTypeId={"roadmap" as any}
                  style={{ height: "700px" }}
                  onChangeLocation={handleChangeLocation}
                  onChangeZoom={handleChangeZoom}
                  apiKey={GOOGLE_MAP_API_KEY}
                />
                <div className="py-4 flex justify-end items-center gap-8 px-3">
                  <button className="text-white" onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    className="primary-background py-2 px-3 rounded font-medium"
                    onClick={() => onChange(location)}
                  >
                    Select the location
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
