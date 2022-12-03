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
                const buttonBtConnect = document.querySelector(`[is="${ButtonBtConnect.tag}"]`) as ButtonBtConnect;
                buttonBtConnect.connected = false;
            }
            const server = await this.device.gatt?.connect?.();
            if (!server) {
                Swal.fire({ title: `Could not connect to bluetooth device.` });
                return false;
            }
            this.server = server;
            return true;
        } catch (error) {
            return false;
        }
    }
    async setPresetCommand(command: string) {
        const service: BluetoothRemoteGATTService = await this.server.getPrimaryService(0xfff0);
        const characteristic: BluetoothRemoteGATTCharacteristic = await service.getCharacteristic(0xfff3);
        const commandValue = command.match(/.{1,2}/g);
        if(!commandValue) {
            throw new Error(`Could not parse command value`);
        }
        const value = commandValue.map(v => parseInt(v, 16));
        characteristic.writeValue(new Uint8Array(value));
    }
}
export const btController = new BtController();