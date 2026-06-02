import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User } from 'lucide-react'
import React from 'react'

const SettingsPage = () => {
  return (
    <div className='w-full'>
      <div className='max-w-5xl mx-auto w-full h-full'>
        <div className='py-4'>
          <h1 className='text-xl font-bold'>Settings</h1>
        </div>

        <div>
          <Tabs className='channels'>
            <div className='mb-6 w-full border-b'>
              <TabsList variant="line" className="w-fit space-x-4 group-data-horizontal/tabs:h-12"
              >
                <TabsTrigger value="channels">
                  <User className='size-4'/>
                  Profile</TabsTrigger>
                <TabsTrigger value="profile">Channels</TabsTrigger>
                <TabsTrigger value="settings">Appearance</TabsTrigger>

              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage