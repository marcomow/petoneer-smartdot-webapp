import Swal from "sweetalert2";
import { ButtonBtConnect } from "./ButtonBtConnect";

class BtController {
    device: BluetoothDevice;
    server: BluetoothRemoteGATTServer;

    async connect(): Promise<boolean> {
        if (!navigator.bluetooth) {
            Swal.fire({ title: `The bluetooth platform is not available on this device.` });
            return false;
        }
        if (!navigator.bluetooth.getAvailability()) {
            Swal.fire({ title: `Bluetooth not available, disconnect from other devices first.` });
            return false;
        }
        try {
            this.device = await navigator.bluetooth.requestDevice({
                filters: [
                    { name: 'PetCat' }
                ],
                optionalServices: [0xfff0]
            });
            this.device.ongattserverdisconnected = () => {
                const buttonBtConnect: ButtonBtConnect = document.querySelector(`[is="${ButtonBtConnect.tag}"]`);
                buttonBtConnect.connected = false;
            }
            this.server = await this.device.gatt?.connect?.();
            return true;
        } catch (error) {
            return false;
        }
    }
    async setPresetCommand(command: string) {
        const service: BluetoothRemoteGATTService = await this.server.getPrimaryService(0xfff0);
        const characteristic: BluetoothRemoteGATTCharacteristic = await service.getCharacteristic(0xfff3);
        const value = command.match(/.{1,2}/g).map(v => parseInt(v, 16));
        characteristic.writeValue(new Uint8Array(value));
    }
}
export const btController = new BtController();