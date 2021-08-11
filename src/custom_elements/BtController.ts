import Swal from "sweetalert2";
import { ButtonBtConnect } from "./ButtonBtConnect";
import { generateInput, ManualArgument } from "./ManualInput";

class BtController {
    device: BluetoothDevice;
    server: BluetoothRemoteGATTServer;
    service: BluetoothRemoteGATTService;
    characteristic: BluetoothRemoteGATTCharacteristic;

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
            this.service = await this.server.getPrimaryService(0xfff0);
            this.characteristic = await this.service.getCharacteristic(0xfff3);
            return true;
        } catch (error) {
            return false;
        }
    }
    async setPresetCommand(command: string): Promise<void> {
        const value = command.match(/.{1,2}/g).map(v => parseInt(v, 16));
        console.log(value);
        this.characteristic.writeValue(new Uint8Array(value));
    }
    async setManualCommand(argument: ManualArgument): Promise<void> {
        const value = generateInput(argument);
        console.log(value);
        this.characteristic.writeValue(new Uint8Array(value));
    }
}
export const btController = new BtController();