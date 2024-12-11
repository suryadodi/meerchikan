import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { SAVE_ADDRESS, UPDATE_USER_ADDRESS } from "../../helpers/mutation";
import { fetchUserAddressRequest } from '@/services/action/addressAction';
import { useAuth } from '@/auth-provider';

interface NewAddressProps {
  closeAddress: (value: boolean) => void;
  onAddressTypeChange: (newType: string) => void;
  addressToEdit?: Address | null;
}

interface Address {
  id?: string;
  address: string;
  city: string;
  name: string;
  save_address_as: string;
  landmark: string;
  pincode: string;
}

const NewAddress: React.FC<NewAddressProps> = ({ closeAddress, onAddressTypeChange, addressToEdit }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { addresses, loading, error } = useSelector((state: any) => state.address);

  // Form states
  const [inputValue, setInputValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [saveValue, setSaveValue] = useState('');
  const [landmarkValue, setLandmarkValue] = useState('');
  const [pincodeValue, setPincodeValue] = useState('');
  const [errors, setErrors] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const [saveAddress] = useMutation(SAVE_ADDRESS); // For creating new address
  const [updateAddress] = useMutation(UPDATE_USER_ADDRESS); // For updating existing address

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserAddressRequest(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (addressToEdit) {
      setIsEditMode(true);
      setInputValue(addressToEdit.address);
      setCityValue(addressToEdit.city);
      setNameValue(addressToEdit.name);
      setSaveValue(addressToEdit.save_address_as);
      setLandmarkValue(addressToEdit.landmark);
      setPincodeValue(addressToEdit.pincode);
    } else {
      setIsEditMode(false);
      resetForm();
    }
  }, [addressToEdit]);

  const resetForm = () => {
    setInputValue('');
    setCityValue('');
    setNameValue('');
    setSaveValue('');
    setLandmarkValue('');
    setPincodeValue('');
    setErrors('');
  };

  

  const validateForm = (): boolean => {
    if (!inputValue.trim() || !cityValue.trim() || !nameValue.trim() || !pincodeValue.trim()) {
      setErrors('All fields are required');
      return false;
    }
    if (pincodeValue.length !== 6) {
      setErrors('Pincode must be 6 digits');
      return false;
    }
    setErrors('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const addressData = {
      address: inputValue,
      city: cityValue,
      name: nameValue,
      save_address_as: saveValue,
      landmark: landmarkValue,
      pincode: pincodeValue,
      user: user?.id,
    };

    try {
      if (isEditMode && addressToEdit?.id) {
        // Update existing address
        await updateAddress({
          variables: { id: addressToEdit.id, ...addressData },
        });
      } else {
        // Save new address
        await saveAddress({
          variables: addressData,
        });
      }

      resetForm();
      closeAddress(false);
      dispatch(fetchUserAddressRequest(user.id)); // Refresh addresses
    } catch (err) {
      console.error('Error saving address:', err);
      setErrors('Failed to save address. Please try again.');
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="address">
            <div className="address-back">
              <img src="/images/back.jpg" alt="back" width={20} onClick={() => closeAddress(false)} />
            </div>
            <h3 className="address-addaddress">{isEditMode ? 'Edit Address' : 'Add Address'}</h3>
          </div>
          <hr />
          <div className="details">
            <form className="details-form" onSubmit={handleSubmit}>
              <div className="details-innerform">
                <input
                  className="details-inner"
                  type="text"
                  placeholder="Your Name"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
              </div>
              <div className="details-innerform">
                <input
                  className="details-inner"
                  type="text"
                  placeholder="Save as (Home, Office, etc.)"
                  value={saveValue}
                  onChange={(e) => setSaveValue(e.target.value)}
                />
              </div>
              <div className="details-innerform">
                <input
                  className="details-inner"
                  type="text"
                  placeholder="Street Address"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="details-innerform">
                <input
                  className="details-inner"
                  type="text"
                  placeholder="City"
                  value={cityValue}
                  onChange={(e) => setCityValue(e.target.value)}
                />
              </div>
              <div className="details-innerform">
                <input
                  className="details-inner"
                  type="text"
                  placeholder="Landmark"
                  value={landmarkValue}
                  onChange={(e) => setLandmarkValue(e.target.value)}
                />
              </div>
              <div className="details-innerform">
                <input
                  className="details-inner"
                  type="number"
                  placeholder="Pincode"
                  value={pincodeValue}
                  onChange={(e) => setPincodeValue(e.target.value)}
                />
              </div>
              {errors && <span className="details-error-message">{errors}</span>}
              <button className="btn" type="submit">
                {isEditMode ? 'Update Address' : 'Save Address'}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default NewAddress;
