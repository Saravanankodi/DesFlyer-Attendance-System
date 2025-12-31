import React from 'react'

const UserAttendance = () => {
  return (
    <>
    <section className="w-full h-auto m-auto">
        <header className="w-full h-auto py-5">
          <h2 className="heading text-4xl text-center">
            Employee <span className="text-[#0496ff]">Attendance</span>
          </h2>
        </header>
        <main className="w-full h-auto">
          <table className="border w-full h-auto whitespace-nowrap">
            <thead className="border border-black bg-[#136CED]">
              <tr>
                <th className="w-1/8 heading border text-lg text-white text-center border-black">Date</th>
                <th className="w-1/8 heading border text-lg text-white text-center border-black">Name</th>
                <th className="w-2/8 heading border text-lg text-white text-center border-black">Check In</th>
                <th className="w-2/8 heading border text-lg text-white text-center border-black">Check Out</th>
                <th className="w-1/8 heading border text-lg text-white text-center border-black">Total Hours</th>
                <th className="w-1/8 heading border text-lg text-white text-center border-black">Status</th>
              </tr>
            </thead>
            <tbody className="border border-black">

            </tbody>
          </table>
        </main>
    </section>
    </>
  )
}

export default UserAttendance