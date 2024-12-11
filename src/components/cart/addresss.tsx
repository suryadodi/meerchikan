import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddressRequest, setSelectedAddress } from '@/services/action/addressAction';
import { useAuth } from '@/auth-provider';
import NewAddress from './addAddress';
import locationImg from '../../../public/images/Sraees/location.svg';
import addImg from '../../../public/images/Sraees/add.png';

interface AddressType {
  id: string;
  mobile: string;
  state: string;
  user: string;
  email: string;
  city: string;
  address: string;
  pincode: string;
  landmark: string;
  save_address_as: string;
  name: string;
}

interface AddressProps {
  close: (value: boolean) => void;
  onSelectAddress: (address: any) => void;

}

const Address: React.FC<AddressProps> = ({ close, onSelectAddress }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [add, setAdd] = useState(false);
  const [selectedAddressType, setSelectedAddressType] = useState<string | null>(null);

  const { addresses, loading, error, selectedAddress } = useSelector((state: any) => state.address);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserAddressRequest(user.id));
    }
  }, [dispatch, user?.id]);


  useEffect(() => {
    // Default to the first address if no selected address is set
    if (!selectedAddress && addresses.length > 0) {
      dispatch(setSelectedAddress(addresses[0]));
    }
  }, [dispatch, selectedAddress, addresses]);


  const handleCloseAddress = () => {
    close(false);
  };

  const handleOpenAddress = () => {
    setAdd(true);
  };

  const handleAddressType = (type: string | null) => {
    setSelectedAddressType(type);
  };
  const handleAddressSelection = (address: AddressType) => {
    dispatch(setSelectedAddress(address));
  };

  const handleAddressClick = (address: any) => {
    onSelectAddress(address); // Trigger the parent callback
  };



  return (
    <>
      {!add ? (
        <>
          <div className="address">
            <div className="address-back">
              <img
                src="/images/back.jpg"
                alt="back"
                width={20}
                onClick={handleCloseAddress}
              />
            </div>
            <h3 className="address-addaddress">Add Address</h3>
          </div>
          <hr className="address-line" />
          {addresses.length > 0 ? (
            addresses.map((address: AddressType) => (
              <div key={address.id} onClick={() => handleAddressClick(address)} className="address-details">
                <div>
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={address.id}
                    checked={selectedAddress?.id === address.id}
                    onChange={() => handleAddressSelection(address)}
                  />
                </div>
                <div className="address-content">
                  <div className='address_body'>
                    <img
                      src={locationImg.src}
                      alt={address.save_address_as}
                    // width={25}
                    // height={25}
                    />
                    <p>{address.save_address_as}</p>
                  </div>

                  <p className="address-new">
                    {address.address}, <br /> {address.city} - {address.pincode}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="address-noaddress">No addresses available</p>
          )}
          <div className="address-details" onClick={handleOpenAddress}>
            <div className="address-add">
              <img
                src={addImg.src}
                alt="add"
                className="address-add"
                height={18}
                width={18}
              />
            </div>
            <p className="address-newaddress">Add a new address</p>
          </div>
        </>
      ) : (
        <NewAddress closeAddress={setAdd} onAddressTypeChange={handleAddressType} />
      )}
    </>
  );
};

export default Address;
