import React from 'react'
import GradientBtn from "./ui/GradientBtn";
export const ApplicationForm = () => {
  return (
    <main>
      <section>
        <header>

        </header>
        <form>
          <div>
            <div>
              <label>Role</label>
              <input/>
            </div>
            <div>
              <label>Company Name</label>
              <input/>
            </div>
          </div>
           {/* Row 2 */}
           <div>
            <div>
              <label>Applied</label>
              <input type="date" />
            </div>
            <div>
              <label>CV</label>
            <input placeholder='Upload cv' />
            </div>
           </div>
           {/* Notes */}
        <div>
          <label>Notes</label>
          <textarea />
        </div>
        <div>
          <div>
            <label>Application Status</label>
            <select>
              <option>Applied</option>
              <option>In progress</option>
              <option>Rejected</option>
            </select>
          </div>

          <GradientBtn size="lg" title="Save application" />
        </div>
        </form>
      </section>

    </main>
  )
}
