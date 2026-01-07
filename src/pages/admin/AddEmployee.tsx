import React, { useState } from 'react';
import { Input } from '../../components/base/Input';
import { Button } from '../../components/base/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';

function AddEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !name || !email || !password) {
      setMessage({ type: 'error', text: 'Please fill all required fields' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Step 1: Create Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Step 2: Create user profile in Firestore
      await setDoc(doc(db, 'users', uid), {
        employeeId,
        name,
        position,
        notes: notes || '',
        email,
        role: 'employee',
        createdAt: new Date(),
      });

      setMessage({ type: 'success', text: 'Employee added successfully!' });

      // Reset form
      setEmployeeId('');
      setName('');
      setPosition('');
      setNotes('');
      setEmail('');
      setPassword('');
    } catch (error:any) {
      let errorMsg = 'Failed to add employee';
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Email already in use';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Invalid email address';
      }
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <>
      <section className="w-full max-w-7xl m-auto transition duration-300">
        <header className="w-full h-auto m-auto">
          <h1 className="heading text-4xl my-2.5 text-center">
            Add Employees
          </h1>
        </header>

        {message && (
          <div className={`mx-auto max-w-md text-center p-4 rounded-lg mb-6 font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full h-auto m-auto flex items-center justify-center flex-col gap-2.5">
          <Input
            type='text'
            label='Create Employee ID'
            placeholder='Create Employee ID'
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            
          />
          <Input
            type='text'
            label='Enter Employee Name'
            placeholder='Enter Employee Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type='text'
            label='Enter Employee Position'
            placeholder='Enter Employee Position'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Input
            type='email'
            label='Employee Email (for login)'
            placeholder='employee@company.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            label='Set Password'
            placeholder='Minimum 6 characters'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type='text'
            label='Notes (Optional)'
            placeholder='Any additional notes...'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Button
            variant={'primary'}
            type="submit"
            disabled={loading}
            className='rounded-lg'
          >
            {loading ? 'Adding Employee...' : 'Add Employee'}
          </Button>
        </form>
      </section>
    </>
  );
}

export default AddEmployee;